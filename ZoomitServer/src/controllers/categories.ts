import { Request, Response, NextFunction, Handler } from 'express';
import { categories } from '../services';

export const getAllCategories: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.getAllCategories());
    } catch (err) {
        next(err);
    }
};

export const getCategoryById: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.getCategoryById(req.params.id));
    } catch (err) {
        next(err);
    }
};

export const addCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.addCategory(req.body.category));
    } catch (err) {
        next(err);
    }
};

export const updateCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.updateCategory(req.params.id, req.body.category));
    } catch (err) {
        next(err);
    }
};

export const deleteCategory: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.deleteCategory(req.params.id));
    } catch (err) {
        next(err);
    }
};
