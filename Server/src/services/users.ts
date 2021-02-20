import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { IUser } from '../models/types/user';
import { 
    addUserToEvent, 
    getEventsById, 
    removeUserFromEvent, 
    getEventsByIdJoined, 
    getEventById 
} from './events';
import config from '../config';
import sendEmail from '../repositories/sendEmail';

const collectionName = config.collections.users.name;
const usersOperationBuilder: IOperationBuilder<IUser> = operationBuilder<IUser>();

export const getAllUsers = () => 
    usersOperationBuilder.getAllObjects(collectionName);

export const getUserById = (id: string) => 
    usersOperationBuilder.getObjectById(collectionName, id);

export const getUsersByType = (type: string) =>
    usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'user_type', [type]);

export const getUsersByEmail = (email: string) =>
    usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'email', [email]);

export const getUserEvents = async (id: string) => {
    const user = await getUserById(id);
    return getEventsById(user.registerd_events);
}

export const getUserEventsJoined = async (id: string) => {
    const user = await getUserById(id);
    return getEventsByIdJoined(user.registerd_events);
}

export const getZoomerEvents = async (id: string) => {
    const user = await getUserById(id);
    return getEventsById(user.owned_events);
}

export const getZoomerRequesters = () => {
    return usersOperationBuilder.getObjectsBySubsetFiled(collectionName, 'is_waiting_for_approval', [true]);
}

export const addUser = (newSource: IUser) => 
    usersOperationBuilder.createObject(collectionName, newSource);

export const addEventToUser = (id:string, event: string) => 
    Promise.all([
        addUserToEvent(event, id), 
        usersOperationBuilder.addUniqueValuesToArray(collectionName, id, 'registerd_events', [event])
    ]).then(async () => {
        const user = await getUserById(id);
        const fullEvent = await getEventById(event);
        sendEmail(user, fullEvent);
    });

export const removeEventFromUser = (id:string, event: string) => 
    Promise.all([
        removeUserFromEvent(event, id), 
        usersOperationBuilder.deleteValuesFromArray(collectionName, id, 'registerd_events', [event])
    ]);

export const addEventToZoomer = (id:string, event: string) => 
    Promise.all([ 
        usersOperationBuilder.addUniqueValuesToArray(collectionName, id, 'owned_events', [event])
    ]);

export const deleteEventFromZoomer = (id:string, event: string) => 
    Promise.all([
        removeUserFromEvent(event, id), 
        usersOperationBuilder.deleteValuesFromArray(collectionName, id, 'owned_events', [event])
    ]);

export const updateUser = (id: string, sourceToUpdate: IUser) => 
    usersOperationBuilder.updateObject(collectionName, id, sourceToUpdate);

export const deleteUser = (id: string) => 
    usersOperationBuilder.deleteObject(collectionName, id);

