import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middlewares/errorHandler';
import { prisma } from '../lib/prisma';
import { hashData } from '../utils/crypto';

// Get all reservations
export const getAllReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        tour: true,
        ticket: true
      }
    });

    res.status(200).json({
      status: 'success',
      results: reservations.length,
      data: {
        reservations
      }
    });
  } catch (error) {
    next(new AppError('Error fetching reservations', 500));
  }
};

// Get reservation by ID
export const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        tour: true,
        ticket: true
      }
    });

    if (!reservation) {
      return next(new AppError('Reservation not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        reservation
      }
    });
  } catch (error) {
    next(new AppError('Error fetching reservation', 500));
  }
};

// Create new reservation
export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Hash sensitive data
    const identityNumber = await hashData(req.body.identityNumber);
    const ipAddress = req.ip ? await hashData(req.ip) : null;
    const macAddress = req.body.macAddress ? await hashData(req.body.macAddress) : null;

    const reservation = await prisma.reservation.create({
      data: {
        userId: req.user!.id,
        name: req.body.name,
        nationality: req.body.nationality,
        identityNumber,
        phone: req.body.phone,
        peopleCount: parseInt(req.body.peopleCount),
        accommodationAddress: req.body.accommodationAddress,
        tourId: req.body.tourId,
        tourDate: new Date(req.body.tourDate),
        ipAddress,
        macAddress
      },
      include: {
        tour: true
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        reservation
      }
    });
  } catch (error) {
    next(new AppError('Error creating reservation', 500));
  }
};

// Update reservation
export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Hash sensitive data if provided
    const identityNumber = req.body.identityNumber ? await hashData(req.body.identityNumber) : undefined;
    const macAddress = req.body.macAddress ? await hashData(req.body.macAddress) : undefined;

    const reservation = await prisma.reservation.update({
      where: {
        id: req.params.id
      },
      data: {
        name: req.body.name,
        nationality: req.body.nationality,
        identityNumber,
        phone: req.body.phone,
        peopleCount: req.body.peopleCount ? parseInt(req.body.peopleCount) : undefined,
        accommodationAddress: req.body.accommodationAddress,
        tourId: req.body.tourId,
        tourDate: req.body.tourDate ? new Date(req.body.tourDate) : undefined,
        macAddress
      },
      include: {
        tour: true
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        reservation
      }
    });
  } catch (error) {
    next(new AppError('Error updating reservation', 500));
  }
};

// Delete reservation
export const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.reservation.delete({
      where: {
        id: req.params.id
      }
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(new AppError('Error deleting reservation', 500));
  }
};

// Get my reservations
export const getMyReservations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: req.user!.id
      },
      include: {
        tour: true,
        ticket: true
      }
    });

    res.status(200).json({
      status: 'success',
      results: reservations.length,
      data: {
        reservations
      }
    });
  } catch (error) {
    next(new AppError('Error fetching your reservations', 500));
  }
}; 