import { Request, Response } from 'express';
import { IEvent } from '../models/types/event';
import config from '../config';
import { IOperationBuilder } from './operations/types';
import operationBuilder from './operations';
import { ObjectId } from 'mongodb';

const collectionName = config.collections.events.name;
const eventsOperationBuilder: IOperationBuilder<IEvent> = operationBuilder<IEvent>();

export const getAllEvents = () => 
    eventsOperationBuilder.getAllObjects(collectionName);

export const getEventById = (id: string) => 
    eventsOperationBuilder.getObjectById(collectionName, id);

export const getEventsById = (ids: Array<string>) => 
    eventsOperationBuilder.getObjectsById(collectionName, ids);

export const getEventByCategory = (category: string) => 
    eventsOperationBuilder.getObjectsBySubsetFiled(collectionName, 'category', [category]);

export const getEventByTitle = (title: string) => 
    eventsOperationBuilder.getObjectsBySubsetFiled(collectionName, 'title', [title]);

export const getEventsByUser = (user: string) => 
    eventsOperationBuilder.getObjectsInSubsetFiled(collectionName, 'registered_users', [user])

export const addEvent = (newEvent: IEvent) => 
    eventsOperationBuilder.createObject(collectionName, newEvent);

export const addUserToEvent = (id:string, user: string) => 
    eventsOperationBuilder.addUniqueValuesToArray(collectionName, id, 'registered_users', [user]);

export const removeUserFromEvent = (id:string, user: string) => 
    eventsOperationBuilder.deleteValuesFromArray(collectionName, id, 'registered_users', [user]);

export const updateEvent = (id: string, eventToUpdate: IEvent) => 
    eventsOperationBuilder.updateObject(collectionName, id, eventToUpdate);

export const deleteEvent = (id: string) => 
    eventsOperationBuilder.deleteObject(collectionName, id);
