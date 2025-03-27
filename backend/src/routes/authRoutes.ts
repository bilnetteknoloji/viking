import express from 'express';
import {
  signup,
  login,
  protect,
  restrictTo
} from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.use(protect);

// Admin only routes
router.use(restrictTo('admin'));

export default router; 