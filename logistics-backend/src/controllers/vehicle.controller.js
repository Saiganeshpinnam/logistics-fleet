import { Vehicle } from '../models/vehicle.model.js';

export const createVehicle = async (req, res) => {
  try {
    const { number_plate, model } = req.body;
    if (!number_plate) return res.status(400).json({ message: 'number_plate required' });
    const v = await Vehicle.create({ number_plate, model });
    return res.status(201).json(v);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const listVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
