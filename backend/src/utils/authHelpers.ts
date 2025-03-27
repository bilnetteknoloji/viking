import { Response, NextFunction } from 'express';
import { User } from '@supabase/supabase-js';
import { AppError } from '../middlewares/errorHandler';

// Define custom user type that matches the base Express.Request.user type
export type CustomUser = {
  id: string;
  role: string;
};

// Helper function to convert Supabase User to CustomUser
export const convertToCustomUser = (user: User): CustomUser => ({
  id: user.id,
  role: user.role || 'user',
});

// Helper function to handle API responses
export const sendResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
};

// Helper function to handle errors
export const handleError = (error: any, next: NextFunction, statusCode = 400) => {
  next(new AppError(error.message, statusCode));
};
