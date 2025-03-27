import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from '../middlewares/errorHandler';
import { GuestSchema } from '../models/Guest';
import { encrypt, hash } from '../utils/encryption';

export const createGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guest = GuestSchema.parse(req.body);
    
    // Encrypt sensitive data
    const encryptedIdentityNumber = encrypt(guest.identityNumber);
    const hashedIpAddress = hash(req.ip || '');
    const hashedMacAddress = guest.macAddress ? hash(guest.macAddress) : undefined;

    const guestData = {
      ...guest,
      identityNumber: encryptedIdentityNumber,
      ipAddress: hashedIpAddress,
      macAddress: hashedMacAddress,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('guests')
      .insert([guestData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      status: 'success',
      data: {
        guest: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('guests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Guest not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        guest: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = GuestSchema.partial().parse(req.body);

    // Encrypt identity number if provided
    if (updates.identityNumber) {
      updates.identityNumber = encrypt(updates.identityNumber);
    }

    const { data, error } = await supabase
      .from('guests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Guest not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        guest: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const deleteGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getGuestBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    let query = supabase
      .from('bookings')
      .select('*, tour:tours(*), agency:agencies(*)')
      .eq('guestId', id);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      data: {
        bookings: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
