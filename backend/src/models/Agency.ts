import { z } from 'zod';

export const AgencySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, 'Agency name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  taxNumber: z.string().min(10, 'Tax number must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Agency = z.infer<typeof AgencySchema>;
