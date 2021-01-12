import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { IUser } from '../models/types/user';
import { addUserToEvent, getEventsById } from './events';
import config from '../config';

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

export const addUser = (newSource: IUser) => 
    usersOperationBuilder.createObject(collectionName, newSource);

export const addEventToUser = (id:string, event: string) => 
    Promise.all([
        addUserToEvent(event, id), 
        usersOperationBuilder.addUniqueValuesToArray(collectionName, id, 'registerd_events', [event])
    ]);

export const updateUser = (id: string, sourceToUpdate: IUser) => 
    usersOperationBuilder.updateObject(collectionName, id, sourceToUpdate);

export const deleteUser = (id: string) => 
    usersOperationBuilder.deleteObject(collectionName, id);
