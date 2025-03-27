import express from 'express';
import { 
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getToursByDate,
  getTourAvailability
} from '../controllers/tourController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllTours);
router.get('/:id', getTourById);
router.get('/date/:date', getToursByDate);
router.get('/:id/availability', getTourAvailability);

// Protected routes (only for authenticated users)
router.use(protect);

// Restricted routes (only for admin and acente)
router.use(restrictTo('admin', 'acente'));
router.post('/', createTour);
router.patch('/:id', updateTour);
router.delete('/:id', deleteTour);

export default router; 