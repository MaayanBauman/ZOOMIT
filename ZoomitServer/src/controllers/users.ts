import { Request, Response, NextFunction } from 'express';
import { users } from '../services';

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    try {
        users.getAllUsers(req, res);
    } catch (err) {
        next(err);
    }
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    try {
        users.getUserById(req, res);
    } catch (err) {
        next(err);
    }
};

export const addUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        users.addUser(req, res);
    } catch (err) {
        next(err);
    }
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        users.updateUser(req, res);
    } catch (err) {
        next(err);
    }
};

export const deleteeUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        users.deleteUser(req, res);
    } catch (err) {
        next(err);
    }
};
