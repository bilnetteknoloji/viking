import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances
} from '../controllers/tourController';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes accessible only to admin and guide
router.use(restrictTo('admin', 'guide'));

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

export default router;
