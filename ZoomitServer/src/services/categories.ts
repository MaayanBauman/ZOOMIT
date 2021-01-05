import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { ICategory } from '../models/types/category';
import config from '../config';

const collectionName = config.collections.categories.name;
const categoriesOperationBuilder: IOperationBuilder<ICategory> = operationBuilder<ICategory>();

export const getAllCategories = () => 
    categoriesOperationBuilder.getAllObjects(collectionName);

export const getCategoryById = (id: string) => 
    categoriesOperationBuilder.getObjectById(collectionName, id);

export const addCategory = (newCategory: ICategory) => 
    categoriesOperationBuilder.createObject(collectionName, newCategory);

export const updateCategory = (id: string, categoryToUpdate: ICategory) => 
    categoriesOperationBuilder.updateObject(collectionName, id, categoryToUpdate);

export const deleteCategory = (id: string) => 
    categoriesOperationBuilder.deleteObject(collectionName, id);
