import { Router } from 'express';
import tourRoutes from './tourRoutes';
import userRoutes from './userRoutes';
import agencyRoutes from './agencies';
import bookingRoutes from './bookings';
import reservationRoutes from './reservationRoutes';

const router = Router();

router.use('/tours', tourRoutes);
router.use('/users', userRoutes);
router.use('/agencies', agencyRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reservations', reservationRoutes);

export default router;
