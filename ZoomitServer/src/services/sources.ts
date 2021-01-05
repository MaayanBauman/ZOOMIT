import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { ISource } from '../models/types/source';
import config from '../config';

const collectionName = config.collections.sources.name;
const sourcesOperationBuilder: IOperationBuilder<ISource> = operationBuilder<ISource>();

export const getAllSources = () => 
    sourcesOperationBuilder.getAllObjects(collectionName);

export const getSourceById = (id: string) => 
    sourcesOperationBuilder.getObjectById(collectionName, id);

export const addSource = (newSource: ISource) => 
    sourcesOperationBuilder.createObject(collectionName, newSource);

export const updateSource = (id: string, sourceToUpdate: ISource) => 
    sourcesOperationBuilder.updateObject(collectionName, id, sourceToUpdate);

export const deleteSource = (id: string) => 
    sourcesOperationBuilder.deleteObject(collectionName, id);
