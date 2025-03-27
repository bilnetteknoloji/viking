import { z } from 'zod';

export const BookingSchema = z.object({
  id: z.string().uuid().optional(),
  tourId: z.string().uuid(),
  guestId: z.string().uuid(),
  agencyId: z.string().uuid().optional(),
  totalAmount: z.number().min(0),
  advancePayment: z.number().min(0),
  remainingAmount: z.number().min(0),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  bookingDate: z.string().datetime(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Booking = z.infer<typeof BookingSchema>;
