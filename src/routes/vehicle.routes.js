import express from 'express';
import { createVehicle, listVehicles } from '../controllers/vehicle.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole(['Admin']), createVehicle);
router.get('/', authMiddleware, requireRole(['Admin','Driver']), listVehicles);

export default router;
