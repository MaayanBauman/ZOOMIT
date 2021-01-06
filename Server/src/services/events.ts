import { Request, Response } from 'express';
import { IEvent } from '../models/types/event';
import config from '../config';
import { IOperationBuilder } from './operations/types';
import operationBuilder from './operations';

const collectionName = config.collections.events.name;
const eventsOperationBuilder: IOperationBuilder<IEvent> = operationBuilder<IEvent>();

export const getAllEvents = () => 
    eventsOperationBuilder.getAllObjects(collectionName);

export const getEventById = (id: string) => 
    eventsOperationBuilder.getObjectById(collectionName, id);

export const addEvent = (newEvent: IEvent) => 
    eventsOperationBuilder.createObject(collectionName, newEvent);

export const updateEvent = (id: string, eventToUpdate: IEvent) => 
    eventsOperationBuilder.updateObject(collectionName, id, eventToUpdate);

export const deleteEvent = (id: string) => 
    eventsOperationBuilder.deleteObject(collectionName, id);