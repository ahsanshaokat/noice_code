import Sequelize from 'sequelize';
import moment from 'moment';
import db from '../models/index';

const errors = {
  title: 'Not Found',
  detail: 'A spot with that Id is not found',
};

/**
 *@class carSpotController
 *
 * @export
 *
 */
export default class carSpotController {
  /**
   * @description - Generates a Carspot
   * @static
   *
   * @param {Object} req - HTTP Request.
   * @param {Object} res - HTTP Response.
   *
   * @memberof carSpotController
   *
   * @returns {Object} Class instance.
   */

  static assignCarSpot(req, res) {
    const { allocated_duration, occupant_id } = req.body;
    db.ParkingSlot.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then(foundSlot => {
        if (!foundSlot) {
          return res.status(404).json({
            errors,
          });
        }
        if (foundSlot && foundSlot.status == 'Free') {
          foundSlot.update({ status: 'Occupied' }).then(updatedSpot => {
            db.CarSlot.create({
              entry_timestamp: moment.utc(),
              allocated_duration,
              occupant_id, // for maintanice mode active
              spotId: req.params.id,
            }).then(updatedSpot =>
              res.status(200).json({
                message: 'Successfully assigned car to spot',
              })
            );
          });
        } else if (foundSlot.status == 'Occupied') {
          res.status(400).json({
            errors: {
              status: '400',
              detail: 'The spot is already occupied',
            },
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

  static removeCarSpot(req, res) {
    const { id } = req.params; // Refers to CarSpot ID

    db.CarSlot.findOne({
      where: {
        id,
      },
    })
      .then(foundCarSpot => {
        if (!foundCarSpot) {
          return res.status(404).json({
            errors,
          });
        }
        if (foundCarSpot) {
          const { spotId } = foundCarSpot; // Grab the Spot ID from DB
          foundCarSpot.update({ exit_timestamp: moment.utc() });
          const startTime = new Date(foundCarSpot.entry_timestamp);
          const endTime = new Date(moment.utc());
          const difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
          const resultInMinutes = Math.round(difference / 60000);
          db.ParkingSlot.findOne({
            where: {
              id: spotId,
            },
          }).then(foundSlot => {
            foundSlot.update({
              status: 'Free',
              message: `The parking fee is ${10 *
                Math.ceil(resultInMinutes / 60)}`,
            });
            return res.status(201).json({
              message: 'Successfully removed car from spot',
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
}
