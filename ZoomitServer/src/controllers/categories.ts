import { Request, Response, NextFunction } from 'express';
import { categories } from '../services';

export const getAllCategories = (req: Request, res: Response, next: NextFunction) => {
    try {
        categories.getAllCategories(req, res);
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
