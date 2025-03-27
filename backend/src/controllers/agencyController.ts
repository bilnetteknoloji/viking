import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from '../middlewares/errorHandler';
import { AgencySchema } from '../models/Agency';

export const createAgency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agency = AgencySchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('agencies')
      .insert([agency])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      status: 'success',
      data: {
        agency: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getAgency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('agencies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Agency not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        agency: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const updateAgency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = AgencySchema.partial().parse(req.body);

    const { data, error } = await supabase
      .from('agencies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Agency not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        agency: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const deleteAgency = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('agencies')
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

export const getAgencyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.query;

    let query = supabase
      .from('bookings')
      .select('*, guest:guests(*), tour:tours(*)')
      .eq('agencyId', id);

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

export const getAgencyTours = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('agencyId', id);

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      data: {
        tours: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
