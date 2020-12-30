import { Request, Response, NextFunction } from 'express';
import { events } from '../services';

export const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
    try {
        events.getAllEvents(req, res);
    } catch (err) {
        next(err);
    }
};

export const getEventById = (req: Request, res: Response, next: NextFunction) => {
    try {
        events.getEventById(req, res);
    } catch (err) {
        next(err);
    }
};

export const addEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        events.addEvent(req, res);
    } catch (err) {
        next(err);
    }
};

export const updateEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        events.updateEvent(req, res);
    } catch (err) {
        next(err);
    }
};

export const deleteEvent = (req: Request, res: Response, next: NextFunction) => {
    try {
        events.deleteEvent(req, res);
    } catch (err) {
        next(err);
    }
};
