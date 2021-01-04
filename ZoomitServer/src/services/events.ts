import { Request, Response } from 'express';
import { IEvent } from '../models/types/event';
import config from '../config';
import { IOperationBuilder } from './operations/types';
import operationBuilder from './operations';

const collectionName = config.collections.events.name;
const eventsOperationBuilder: IOperationBuilder<IEvent> = operationBuilder<IEvent>();

export const getAllEvents = () => eventsOperationBuilder.getAllObjects(collectionName);

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
