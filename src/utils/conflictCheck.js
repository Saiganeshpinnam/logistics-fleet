import { Op } from 'sequelize';
import { Delivery } from '../models/delivery.model.js';

export const conflictCheck = async (driver_id, start_time, end_time) => {
  // If times are not provided, skip strict overlap check (assume ok)
  if (!start_time || !end_time) return false;

  const overlap = await Delivery.findOne({
    where: {
      driver_id,
      status: { [Op.ne]: 'delivered' },
      [Op.and]: [
        { start_time: { [Op.lt]: new Date(end_time) } },
        { end_time: { [Op.gt]: new Date(start_time) } }
      ]
    }
  });
  return !!overlap;
};
