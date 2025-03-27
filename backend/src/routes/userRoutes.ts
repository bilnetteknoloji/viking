import express from 'express';
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes for logged in user
router.get('/me', getMe);
router.patch('/update-me', updateMe);
router.delete('/delete-me', deleteMe);

// Admin only routes
router.use(restrictTo('ADMIN'));
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 