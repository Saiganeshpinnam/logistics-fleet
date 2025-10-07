import { Tracking } from '../models/tracking.model.js';
import { Delivery } from '../models/delivery.model.js';

export const saveTracking = async (req, res) => {
  try {
    const { deliveryId, latitude, longitude } = req.body;
    if (!deliveryId || !latitude || !longitude) return res.status(400).json({ message: 'Missing fields' });

    const delivery = await Delivery.findByPk(deliveryId);
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    const t = await Tracking.create({ delivery_id: deliveryId, latitude, longitude });
    // emit via socket if available
    const io = req.app.get('io');
    if (io) io.emit(`track-${deliveryId}`, { deliveryId, latitude, longitude, timestamp: new Date() });

    return res.status(201).json(t);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTrackingForDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const rows = await Tracking.findAll({ where: { delivery_id: deliveryId }, order: [['createdAt','ASC']] });
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
