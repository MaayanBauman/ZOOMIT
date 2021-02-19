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

export const getUsersByType: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getUsersByType(req.params.type));
    } catch (err) {
        next(err);
    }
};

export const getUsersByEmail: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getUsersByEmail(req.params.email));
    } catch (err) {
        next(err);
    }
};

export const getAllZoomerRequesters: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getZoomerRequesters());
    } catch (err) {
        next(err);
    }
}

export const getUserEvents: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getUserEvents(req.params.id));
    } catch (err) {
        next(err);
    }
};
export const getUserEventsJoined: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getUserEventsJoined(req.params.id));
    } catch (err) {
        next(err);
    }
};
export const getZoomerEvents: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.getZoomerEvents(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const addUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = req.body.user;
        delete user._id;
        res.json(await users.addUser({...user, user_type: 'user'}));
    } catch (err) {
        next(err);
    }
};

export const addEventToUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.addEventToUser(req.params.id, req.params.event));
    } catch (err) {
        next(err);
    }
};

export const removeEventFromUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await users.removeEventFromUser(req.params.id, req.params.event));
    } catch (err) {
        next(err);
    }
};

export const updateUser: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = req.body.user;
        delete user._id;
        res.json(await users.updateUser(req.params.id, user));
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
