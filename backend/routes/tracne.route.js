import express from 'express';
import { getAcneLogs, createAcneLog, updateAcneLog, deleteAcneLog } from '../controllers/tracne.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAcneLogs); // Fetch all acne logs
router.post('/', protect, createAcneLog); // Create a new acne log
router.put('/:id', protect, updateAcneLog); // Update an existing acne log
router.delete('/:id', protect, deleteAcneLog); // Delete an acne log

export default router;
