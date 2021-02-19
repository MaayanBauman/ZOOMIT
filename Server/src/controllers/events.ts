import { Request, Response, NextFunction, Handler } from 'express';
import { events, users } from '../services';

export const getAllEvents: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getAllEvents());
    } catch (err) {
        next(err);
    }
};

export const getAllEventsJoined: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getAllEventsJoined());
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

export const getEventsByFiltersJoined: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getEventsByFiltersJoined(req.body.data));
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

export const getSumEventsPriceByCategor: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await events.getSumEventsPriceByCategor());
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
        let event = req.body.event;
        delete event.id;
        delete event.source_id;
        event.start_time = new Date(req.body.event.start_time);
        event.end_time = new Date(req.body.event.end_time);
        res.json(await events.addEvent(event));
    } catch (err) {
        next(err);
    }
};

export const addZoomerEvent: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let event = req.body.event;
        delete event.id;
        delete event.source_id;
        event.start_time = new Date(req.body.event.start_time);
        event.end_time = new Date(req.body.event.end_time);
        event.price = +req.body.event.price;
        const result = await events.addEvent(event); 
        const eventId= result.ops[0]._id as string;
        await users.addEventToZoomer(event.zoomer_id, eventId);

        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const updateEvent: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let event = req.body.event;
        delete event.id;
        delete event.source_id;
        event.start_time = new Date(req.body.event.start_time);
        event.end_time = new Date(req.body.event.end_time);
        event.price = +req.body.event.price;

        res.json(await events.updateEvent(req.params.id, event))
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
