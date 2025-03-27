import { z } from 'zod';

export const GuestSchema = z.object({
  id: z.string().uuid().optional(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  nationality: z.string().min(2, 'Nationality must be at least 2 characters'),
  identityNumber: z.string().min(6, 'Identity number must be at least 6 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  numberOfGuests: z.number().min(1, 'Number of guests must be at least 1'),
  accommodationAddress: z.string().min(5, 'Accommodation address must be at least 5 characters'),
  tourDate: z.string().datetime(),
  createdAt: z.string().datetime().optional(),
  ipAddress: z.string().ip().optional(),
  macAddress: z.string().optional(),
});

export type Guest = z.infer<typeof GuestSchema>;
