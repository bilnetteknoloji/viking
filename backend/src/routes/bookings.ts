import express from 'express';
import { protect, restrictTo } from '../controllers/authController';
import { validate } from '../middlewares/validation';
import { z } from 'zod';

const router = express.Router();

const bookingSchema = z.object({
  body: z.object({
    tourId: z.string().uuid(),
    guestId: z.string().uuid(),
    agencyId: z.string().uuid().optional(),
    totalAmount: z.number().min(0),
    advancePayment: z.number().min(0),
    remainingAmount: z.number().min(0),
    status: z.enum(['pending', 'confirmed', 'cancelled']),
    bookingDate: z.string().datetime(),
  }),
});

// TODO: Add booking controller functions and implement routes
router.use(protect);

router.route('/')
  .get(/* getBookings */)
  .post(validate(bookingSchema), /* createBooking */);

router.route('/:id')
  .get(/* getBooking */)
  .patch(validate(bookingSchema), /* updateBooking */)
  .delete(restrictTo('admin', 'agency'), /* deleteBooking */);

router.post('/:id/confirm', /* confirmBooking */);
router.post('/:id/cancel', /* cancelBooking */);
router.post('/:id/payment', /* processPayment */);

export default router;
