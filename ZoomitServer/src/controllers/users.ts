import { Request, Response, NextFunction, Handler } from 'express';
import { users } from '../services';

export const getAllUsers: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getAllUsers());
    } catch (err) {
        next(err);
    }
};

export const getUserById: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getUserById(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const addUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.addUser(req.body.user));
    } catch (err) {
        next(err);
    }
};

export const updateUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.updateUser(req.params.id, req.body.user));
    } catch (err) {
        next(err);
    }
};

export const deleteeUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.deleteUser(req.params.id));
    } catch (err) {
        next(err);
    }
};
