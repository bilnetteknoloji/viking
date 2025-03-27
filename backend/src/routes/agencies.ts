import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
import { validate } from '../middlewares/validation';
import { z } from 'zod';

const router = express.Router();

const agencySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    contactPerson: z.string().min(2),
    phoneNumber: z.string().min(10),
    email: z.string().email(),
    taxNumber: z.string().min(10),
    address: z.string().min(5),
  }),
});

// TODO: Add agency controller functions and implement routes
router.use(protect);

router.route('/')
  .get(restrictTo('admin'), /* getAgencies */)
  .post(restrictTo('admin'), validate(agencySchema), /* createAgency */);

router.route('/:id')
  .get(restrictTo('admin', 'agency'), /* getAgency */)
  .patch(restrictTo('admin'), validate(agencySchema), /* updateAgency */)
  .delete(restrictTo('admin'), /* deleteAgency */);

router.get('/:id/bookings', restrictTo('admin', 'agency'), /* getAgencyBookings */);
router.get('/:id/tours', restrictTo('admin', 'agency'), /* getAgencyTours */);

export default router;
