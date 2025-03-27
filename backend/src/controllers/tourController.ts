import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middlewares/errorHandler';
import { Tour } from '../models/Tour';
import { supabase } from '../config/supabase';

// Get all tours
export const getAllTours = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: tours, error } = await supabase
      .from('tours')
      .select('*');

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    next(new AppError('Error fetching tours', 500));
  }
};

// Get tour by ID
export const getTourById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: tour, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    next(new AppError('Error fetching tour', 500));
  }
};

// Create new tour
export const createTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTour = {
      name: req.body.name,
      description: req.body.description,
      route_info: req.body.route_info,
      boat_name: req.body.boat_name,
      start_time: new Date(req.body.start_time),
      max_capacity: parseInt(req.body.max_capacity),
      price: parseFloat(req.body.price),
      image_url: req.body.image_url,
      created_at: new Date()
    };

    const { data, error } = await supabase
      .from('tours')
      .insert([newTour])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      status: 'success',
      data: {
        tour: data
      }
    });
  } catch (error) {
    next(new AppError('Error creating tour', 500));
  }
};

// Update tour
export const updateTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      route_info: req.body.route_info,
      boat_name: req.body.boat_name,
      start_time: req.body.start_time ? new Date(req.body.start_time) : undefined,
      max_capacity: req.body.max_capacity ? parseInt(req.body.max_capacity) : undefined,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      image_url: req.body.image_url
    };

    const { data, error } = await supabase
      .from('tours')
      .update(updateData)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return next(new AppError('Tour not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: data
      }
    });
  } catch (error) {
    next(new AppError('Error updating tour', 500));
  }
};

// Delete tour
export const deleteTour = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(new AppError('Error deleting tour', 500));
  }
};

// Get tours by date
export const getToursByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const { data: tours, error } = await supabase
      .from('tours')
      .select('*')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString());

    if (error) throw error;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    next(new AppError('Error fetching tours by date', 500));
  }
};

// Get tour availability
export const getTourAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: tour, error: tourError } = await supabase
      .from('tours')
      .select('max_capacity')
      .eq('id', req.params.id)
      .single();

    if (tourError) throw tourError;

    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    const { data: reservations, error: reservationError } = await supabase
      .from('reservations')
      .select('people_count')
      .eq('tour_id', req.params.id);

    if (reservationError) throw reservationError;

    const totalCapacity = tour.max_capacity;
    const bookedSeats = reservations.reduce((acc: number, curr: { people_count: number }) => acc + curr.people_count, 0);
    const availableSeats = totalCapacity - bookedSeats;

    res.status(200).json({
      status: 'success',
      data: {
        totalCapacity,
        bookedSeats,
        availableSeats
      }
    });
  } catch (error) {
    next(new AppError('Error checking tour availability', 500));
  }
}; 