import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { AppError } from '../middlewares/errorHandler';
import { BookingSchema } from '../models/Booking';
import { WhatsAppService } from '../services/whatsapp';
import { PaymentService } from '../services/payment';
import { NotificationService } from '../services/notification';

const whatsappService = new WhatsAppService();
const paymentService = new PaymentService();
const notificationService = new NotificationService();

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = BookingSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;

    // Send WhatsApp confirmation
    if (data.guest?.phoneNumber) {
      await whatsappService.sendBookingConfirmation(data.guest.phoneNumber, data);
    }

    // Create payment intent if advance payment is required
    if (data.advancePayment > 0) {
      const paymentIntent = await paymentService.createPaymentIntent(data.advancePayment);
      data.paymentIntentId = paymentIntent.id;
      
      // Update booking with payment intent
      await supabase
        .from('bookings')
        .update({ paymentIntentId: paymentIntent.id })
        .eq('id', data.id);
    }

    res.status(201).json({
      status: 'success',
      data: {
        booking: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('bookings')
      .select('*, guest:guests(*), tour:tours(*), agency:agencies(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Booking not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        booking: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = BookingSchema.partial().parse(req.body);

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Booking not found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        booking: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('bookings')
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

export const confirmBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Booking not found', 404);

    // Send confirmation notifications
    if (data.guest?.phoneNumber) {
      await whatsappService.sendBookingConfirmation(data.guest.phoneNumber, data);
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new AppError('Booking not found', 404);

    // Process refund if payment was made
    if (data.paymentIntentId) {
      await paymentService.createRefund(data.paymentIntentId);
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking: data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, error.status || 400));
  }
};
