import { Delivery } from '../models/delivery.model.js';
import { conflictCheck } from '../utils/conflictCheck.js';
import { Vehicle } from '../models/vehicle.model.js';

export const createDelivery = async (req, res) => {
  try {
    const { pickup_location, drop_location, driver_id, vehicle_id, customer_id, start_time, end_time } = req.body;
    if (!pickup_location || !drop_location || !driver_id || !vehicle_id || !customer_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const conflict = await conflictCheck(driver_id, start_time, end_time);
    if (conflict) return res.status(400).json({ message: 'Driver has overlapping assignment' });

    const delivery = await Delivery.create({ pickup_location, drop_location, driver_id, vehicle_id, customer_id, start_time, end_time });
    // mark vehicle in_use
    const vehicle = await Vehicle.findByPk(vehicle_id);
    if (vehicle) await vehicle.update({ status: 'in_use' });

    return res.status(201).json(delivery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const delivery = await Delivery.findByPk(id);
    if (!delivery) return res.status(404).json({ message: 'Not found' });

    // only allow transitions: pending -> on_route -> delivered
    if (status === 'on_route' && delivery.status === 'pending') {
      await delivery.update({ status });
    } else if (status === 'delivered' && (delivery.status === 'on_route' || delivery.status === 'pending')) {
      await delivery.update({ status });
      // free vehicle (optional)
      const vehicle = await Vehicle.findByPk(delivery.vehicle_id);
      if (vehicle) await vehicle.update({ status: 'available' });
    } else {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    return res.json(delivery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDelivery = async (req, res) => {
  try {
    const id = req.params.id;
    const delivery = await Delivery.findByPk(id);
    if (!delivery) return res.status(404).json({ message: 'Not found' });
    return res.json(delivery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
