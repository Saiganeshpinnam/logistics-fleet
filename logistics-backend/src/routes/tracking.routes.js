import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { saveTracking, getTrackingForDelivery } from '../controllers/tracking.controller.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole(['Driver']), saveTracking);
router.get('/:deliveryId', authMiddleware, getTrackingForDelivery);

export default router;
