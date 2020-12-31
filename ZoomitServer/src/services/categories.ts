import { Request, Response } from 'express';

export const getAllCategories = (req:Request, res: Response) => {
    res.send('GET all categories');
};

export const getCategoryById = (req:Request, res: Response) => {
    res.send('GET categorie by ID ' + req.params.id);
};

export const addCategory = (req:Request, res: Response) => {
    res.send('ADD categorie ' + req.body.values);
};

export const updateCategory = (req:Request, res: Response) => {
    res.send('UDPATE categorie ' + req.params.id + 'values ' +  req.body.values);
};

export const deleteCategory = (req:Request, res: Response) => {
    res.send('DELETE categorie ' + req.params.id + 'values ' +  req.body.values);
};
