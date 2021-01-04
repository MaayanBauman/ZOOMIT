import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { ICategory } from '../models/types/category';
import config from '../config';

const collectionName = config.collections.categories.name;
const categoriesOperationBuilder: IOperationBuilder<ICategory> = operationBuilder<ICategory>();

export const getAllCategories = () => categoriesOperationBuilder.getAllObjects(collectionName);

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
