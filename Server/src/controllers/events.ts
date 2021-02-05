import { Request, Response, NextFunction, Handler } from 'express';
import { events } from '../services';

export const getAllEvents: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getAllEvents());
    } catch (err) {
        next(err);
    }
};

export const getEventsByFilters: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventsByFilters(req.body.data));
    } catch (err) {
        next(err);
    }
};


export const getEventByCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventByCategory(req.params.category));
    } catch (err) {
        next(err);
    }
};

export const getCountEventsByCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getCountEventsByCategory());
    } catch (err) {
        next(err);
    }
};

export const getEventByTitle: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventByTitle(req.params.title));
    } catch (err) {
        next(err);
    }
};

export const getEventById: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventById(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const getEventsByUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventsByUser(req.params.user));
    } catch (err) {
        next(err);
    }
};

export const addEvent: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.addEvent(req.body.event));
    } catch (err) {
        next(err);
    }
};

export const updateEvent: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.updateEvent(req.params.id, req.body.event))
    } catch (err) {
        next(err);
    }
};

export const deleteEvent: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.deleteEvent(req.params.id));
    } catch (err) {
        next(err);
    }
};
