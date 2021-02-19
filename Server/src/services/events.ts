import { query, Request, Response } from 'express';
import { IEvent } from '../models/types/event';
import config from '../config';
import { IOperationBuilder } from './operations/types';
import operationBuilder from './operations';
import { ObjectId } from 'mongodb';
import EventsFilter from '../models/types/EventsFilter';

const collectionName = config.collections.events.name;
const eventsOperationBuilder: IOperationBuilder<IEvent> = operationBuilder<IEvent>();

export const getAllEvents = () => 
    eventsOperationBuilder.getAllObjects(collectionName);

export const getAllEventsJoined = () => 
    eventsOperationBuilder.getAllObjectsWithJoin(collectionName, 'sources', 'source_id', '_id' , 'source_detailes', 'users', 'zoomer_id', '_id', 'zoomer_detailes');


export const getEventsByFilters = (filters: EventsFilter) => {
    let query: object = {
        price: { $gte: filters.min_price, $lte: filters.max_price },
        start_time: { $gte: new Date(filters.start_time) },
    };

    if(!!filters.title) query = { ...query, title: { $regex: filters.title }};
    if(!!filters.zoomer_id) query = { ...query, zoomer_id: filters.zoomer_id };
    if(!!filters.category) query = { ...query, category: filters.category };
    return eventsOperationBuilder.getAllObjectsByQuery(collectionName, query);
}


export const getEventsByFiltersJoined = (filters: EventsFilter) => {
    let query: object = {
        price: { $gte: filters.min_price, $lte: filters.max_price },
        start_time: { $gte: new Date(filters.start_time) },
    };

    if(!!filters.title) query = { ...query, title: { $regex: filters.title }};
    if(!!filters.zoomer_id) query = { ...query, zoomer_id: filters.zoomer_id };
    if(!!filters.category) query = { ...query, category: filters.category };
    return eventsOperationBuilder.getAllObjectsWithJoinByQuery(collectionName, query, 'sources', 'source_id', '_id' , 'source_detailes', 'users', 'zoomer_id', '_id', 'zoomer_detailes');
}


export const getEventById = (id: string) => 
    eventsOperationBuilder.getObjectById(collectionName, id);

export const getEventsById = (ids: Array<string>) => 
    eventsOperationBuilder.getObjectsById(collectionName, ids);

    
export const getEventsByIdJoined = (ids: Array<string>) => 
    eventsOperationBuilder.getObjectsByIdWithJoin(collectionName, ids, 'sources', 'source_id', '_id' , 'source_detailes', 'users', 'zoomer_id', '_id', 'zoomer_detailes');


export const getEventByCategory = (category: string) => 
    eventsOperationBuilder.getObjectsBySubsetFiled(collectionName, 'category', [category]);

export const getCountEventsByCategory = () => 
    eventsOperationBuilder.getCountObjectsByFiled(collectionName, 'category');

export const getSumEventsPriceByCategor = () => 
    eventsOperationBuilder.getSumByFiled(collectionName, 'price', 'category');

export const getEventByTitle = (title: string) => 
    eventsOperationBuilder.getObjectsRegexFiled(collectionName, 'title', title);

export const getEventsByUser = (user: string) => 
    eventsOperationBuilder.getObjectsInSubsetFiled(collectionName, 'registered_users', [user]);

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
