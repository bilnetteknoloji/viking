import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

export const identityNumberSchema = z
  .string()
  .min(6, 'Identity number must be at least 6 characters')
  .max(20, 'Identity number must not exceed 20 characters');

export const validateEmail = (email: string) => emailSchema.safeParse(email);
export const validatePassword = (password: string) => passwordSchema.safeParse(password);
export const validatePhone = (phone: string) => phoneSchema.safeParse(phone);
export const validateIdentityNumber = (id: string) => identityNumberSchema.safeParse(id);
