import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { AppError } from '../middlewares/errorHandler';
import { sendEmail } from '../utils/email';
import { hashData } from '../utils/crypto';
import { supabase } from '../config/supabase';

interface JWTPayload {
  id: string;
  role: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password_hash: string;
}

const signToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  // JWT için süre formatı: 
  // number (saniye) veya 
  // string ('1d', '1h', '1m' gibi)
  const expiresIn = process.env.JWT_EXPIRES_IN ? 
    parseInt(process.env.JWT_EXPIRES_IN) || '7d' : 
    '7d';

  const options: SignOptions = {
    expiresIn
  };
  
  return jwt.sign(payload, secret as Secret, options);
};

const createSendToken = (user: User, statusCode: number, res: Response) => {
  const token = signToken({ id: user.id, role: user.role });

  // Remove password from output
  const { password_hash, ...userWithoutPassword } = user;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userWithoutPassword
    }
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, phone, role } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          name,
          phone,
          role: role || 'misafir'
        }
      ])
      .select()
      .single();

    if (error || !data) {
      throw new AppError('Error creating user', 500);
    }

    const user = data as User;

    // Create token
    const token = signToken({ id: user.id, role: user.role });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Get user from database
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return next(new AppError('Invalid email or password', 401));
    }

    const user = data as User;

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create token
    const token = signToken({ id: user.id, role: user.role });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get user based on email
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', req.body.email)
      .single();

    if (error || !data) {
      return next(new AppError('There is no user with that email address.', 404));
    }

    const user = data as User;

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = await hashData(resetToken);
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with reset token
    const { error: updateError } = await supabase
      .from('users')
      .update({
        password_reset_token: passwordResetToken,
        password_reset_expires: passwordResetExpires
      })
      .eq('id', user.id);

    if (updateError) throw updateError;

    // Send email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      // If email fails, remove reset token
      await supabase
        .from('users')
        .update({
          password_reset_token: null,
          password_reset_expires: null
        })
        .eq('id', user.id);

      return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get user based on the token
    const hashedToken = await hashData(req.params.token);

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('password_reset_token', hashedToken)
      .eq('password_reset_expires', {
        gt: new Date()
      })
      .single();

    if (error || !data) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    const user = data as User;

    // 2) Set the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const { data: updatedUserData, error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        password_reset_token: null,
        password_reset_expires: null
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError || !updatedUserData) {
      return next(new AppError('Error updating password', 500));
    }

    // 3) Log the user in, send JWT
    createSendToken(updatedUserData as User, 200, res);
  } catch (error) {
    next(error);
  }
};

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const updatePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Get user from collection
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user?.id)
      .single();

    if (error || !data) {
      return next(new AppError('User not found', 404));
    }

    const user = data as User;

    // 2) Check if POSTed current password is correct
    if (!(await bcrypt.compare(req.body.currentPassword, user.password_hash))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) Update password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const { data: updatedUserData, error: updateError } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError || !updatedUserData) {
      return next(new AppError('Error updating password', 500));
    }

    // 4) Log user in, send JWT
    createSendToken(updatedUserData as User, 200, res);
  } catch (error) {
    next(error);
  }
};

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in', 401));
    }

    // Verify token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, secret as jwt.Secret) as JWTPayload;

    // Check if user still exists
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !data) {
      return next(new AppError('User no longer exists', 401));
    }

    const user = data as User;

    // Grant access
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission', 403));
    }
    next();
  };
}; 