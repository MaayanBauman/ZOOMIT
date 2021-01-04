import { Request, Response, NextFunction } from 'express';
import { sources } from '../services';

export const getAllSources = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await sources.getAllSources());
    } catch (err) {
        next(err);
    }
};

export const getSourceById = (req: Request, res: Response, next: NextFunction) => {
    try {
        sources.getSourceById(req, res);
    } catch (err) {
        next(err);
    }
};

export const addSource = (req: Request, res: Response, next: NextFunction) => {
    try {
        sources.addSource(req, res);
    } catch (err) {
        next(err);
    }
};

export const updateSource = (req: Request, res: Response, next: NextFunction) => {
    try {
        sources.updateSource(req, res);
    } catch (err) {
        next(err);
    }
};

export const deleteSource = (req: Request, res: Response, next: NextFunction) => {
    try {
        sources.deleteSource(req, res);
    } catch (err) {
        next(err);
    }
};
