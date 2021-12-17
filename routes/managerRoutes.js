import parkingLot from '../controllers/parkingLotController';
import slot from '../controllers/parkingSlotController';
import carSlots from '../controllers/carSlotsController';
import authorization from '../middleware/authorization';
import parkValidation from '../middleware/parkValidation';
import carSpotValidation from '../middleware/carSpotValidation';
import { verifyId } from '../middleware/idValidation';

/**
 *@Function managerRoutes.
 *
 * @export
 * @param {any} app
 *
 * @returns {void}
 */
export default function managerRoutes(app) {
  app
    .route('/api/v1/parking-lots')
    .post(authorization, parkValidation, parkingLot.createPark)
    .get(authorization, parkingLot.getParks);

  app
    .route('/api/v1/parking-lots/:id')
    .put(authorization, verifyId, parkingLot.editPark)
    .delete(authorization, verifyId, parkingLot.deletePark)
    .get(authorization, verifyId, parkingLot.getAPark);

  // generate a slot
  app
    .route('/api/v1/parking-lots/:id/slot/new')
    .post(authorization, slot.generateSpot);

  app
    .route('/api/v1/parking-slots/:id')
    // delete a slot
    .delete(authorization, verifyId, slot.deleteSlot);

  // assign car to slot
  app
    .route('/api/v1/parking-slots/:id/car-slot')
    .post(authorization, verifyId, carSpotValidation, carSlots.assignCarSpot);
  // remove car from slot
  app
    .route('/api/v1/car-slot/:id')
    .delete(authorization, verifyId, carSlots.removeCarSpot);
}
