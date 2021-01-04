import { Request, Response, NextFunction, Handler } from 'express';
import { categories } from '../services';

export const getAllCategories: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await categories.getAllCategories());
    } catch (err) {
        next(err);
    }
};

export const getCategoryById = (req: Request, res: Response, next: NextFunction) => {
    try {
        categories.getCategoryById(req, res);
    } catch (err) {
        next(err);
    }
};

export const addCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        categories.addCategory(req, res);
    } catch (err) {
        next(err);
    }
};

export const updateCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        categories.updateCategory(req, res);
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = (req: Request, res: Response, next: NextFunction) => {
    try {
        categories.deleteCategory(req, res);
    } catch (err) {
        next(err);
    }
};
