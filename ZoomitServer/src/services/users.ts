import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { IUser } from '../models/types/user';
import config from '../config';

const collectionName = config.collections.users.name;
const usersOperationBuilder: IOperationBuilder<IUser> = operationBuilder<IUser>();

export const getAllUsers = () => usersOperationBuilder.getAllObjects(collectionName);

export const getUserById = (req:Request, res: Response) => {
    res.send('GET user by ID ' + req.params.id);
};

export const addUser = (req:Request, res: Response) => {
    res.send('ADD user ' + req.body.values);
};

export const updateUser = (req:Request, res: Response) => {
    res.send('UDPATE user ' + req.params.id + 'values ' +  req.body.values);
};

export const deleteUser = (req:Request, res: Response) => {
    res.send('DELETE user ' + req.params.id + 'values ' +  req.body.values);
};
