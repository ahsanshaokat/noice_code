import Sequelize from 'sequelize';
import randomstring from 'randomstring';
import db from '../models/index';

const errors = {
  title: 'Not Found',
  detail: 'A spot with that Id is not found',
};

/**
 *@class parkingSlotController
 *
 * @export
 *
 */
export default class parkingSlotController {
  /**
   * @description - Generates a spot
   * @static
   *
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   *
   * @memberof parkingSlotController
   *
   * @returns {Object} Class instance.
   */

  static generateSpot(req, res) {
    const spotname = `Spot ${randomstring.generate({
      length: 3,
      charset: 'alphabetic',
      capitalization: 'uppercase',
    })}`;

    const { status } = req.body;
    db.ParkingSlot.findOne({
      where: {
        spotname,
        userId: req.userId,
      },
    })
      .then(foundSlot => {
        if (foundSlot) {
          return res.status(409).json({
            errors: {
              title: 'Conflict',
              detail: 'You already have a spot with that name',
            },
          });
        }
        if (!foundSlot) {
          db.ParkingSlot.create({
            spotname,
            userId: req.userId,
            parkId: req.params.id,
            status,
          }).then(newSpot => {
            res.status(201).json({
              data: {
                message: 'Spot created successfully',
              },
            });
          });
        }
      })
      .catch(Error => {
        res.status(500).json({
          errors: {
            status: '500',
            detail: 'Internal server error',
          },
        });
      });
  }

  /**
   * @description - Deletes a spot
   * @static
   *
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   *
   * @memberof parkingSlotController
   *
   * @returns {Object} Class instance.
   */
  static deleteSlot(req, res) {
    db.ParkingSlot.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })
      .then(foundSlot => {
        if (foundSlot) {
          db.ParkingSlot.destroy({
            where: {
              id: req.params.id,
              userId: req.userId,
            },
            cascade: true,
          }).then(() =>
            res.status(200).json({
              data: {
                message: 'Spot deleted successfully',
              },
            })
          );
        }
        if (!foundSlot) {
          return res.status(404).json({
            errors,
          });
        }
      })
      .catch(Error => {
        res.status(500).json({
          errors: {
            status: '500',
            detail: 'Internal server error',
          },
        });
      });
  }
}
