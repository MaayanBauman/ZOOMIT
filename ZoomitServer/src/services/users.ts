import { Request, Response } from 'express';

export const getAllUsers = (req:Request, res: Response) => {
    res.send('GET all users');
};

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
