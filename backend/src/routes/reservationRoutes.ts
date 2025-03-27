import express from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  getMyReservations
} from '../controllers/reservationController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

// Protected routes (only for authenticated users)
router.use(protect);

// Public routes for authenticated users
router.get('/my-reservations', getMyReservations);

// Restricted routes (only for admin and agency)
router.use(restrictTo('ADMIN', 'AGENCY'));
router.get('/', getAllReservations);
router.get('/:id', getReservationById);
router.post('/', createReservation);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router; 