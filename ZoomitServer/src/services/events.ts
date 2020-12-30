import { Request, Response } from 'express';

export const getAllEvents = (req:Request, res: Response) => {
    res.send('GET all events');
};

export const getEventById = (req:Request, res: Response) => {
    res.send('GET event by ID ' + req.params.id);
};

export const addEvent = (req:Request, res: Response) => {
    res.send('ADD event ' + req.body.values);
};

export const updateEvent = (req:Request, res: Response) => {
    res.send('UDPATE event ' + req.params.id + 'values ' +  req.body.values);
};

export const deleteEvent = (req:Request, res: Response) => {
    res.send('DELETE event ' + req.params.id + 'values ' +  req.body.values);
};
