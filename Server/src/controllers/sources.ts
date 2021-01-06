import { Request, Response, NextFunction, Handler, json } from 'express';
import { sources } from '../services';

export const getAllSources: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.getAllSources());
    } catch (err) {
        next(err);
    }
};

export const getSourceById: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.getSourceById(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const addSource: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.addSource(req.body.source));
    } catch (err) {
        next(err);
    }
};

export const updateSource: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.updateSource(req.params.id, req.body.source));
    } catch (err) {
        next(err);
    }
};

export const deleteSource: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.deleteSource(req.params.id));
    } catch (err) {
        next(err);
    }
};
