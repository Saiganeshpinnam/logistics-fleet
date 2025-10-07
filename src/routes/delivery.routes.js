import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { createDelivery, updateStatus, getDelivery } from '../controllers/delivery.controller.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole(['Admin']), createDelivery);
router.put('/:id/status', authMiddleware, requireRole(['Driver','Admin']), updateStatus);
router.get('/:id', authMiddleware, getDelivery);

export default router;
