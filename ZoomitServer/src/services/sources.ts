import { Request, Response } from 'express';
import { IOperationBuilder } from './operations/types'
import operationBuilder from './operations';
import { ISource } from '../models/types/source';
import config from '../config';

const collectionName = config.collections.sources.name;
const sourcesOperationBuilder: IOperationBuilder<ISource> = operationBuilder<ISource>();

export const getAllSources = () => sourcesOperationBuilder.getAllObjects(collectionName);

export const getSourceById = (req:Request, res: Response) => {
    res.send('GET source by ID ' + req.params.id);
};

export const addSource = (req:Request, res: Response) => {
    res.send('ADD source ' + req.body.values);
};

export const updateSource = (req:Request, res: Response) => {
    res.send('UDPATE srouce ' + req.params.id + 'values ' +  req.body.values);
};

export const deleteSource = (req:Request, res: Response) => {
    res.send('DELETE srouce ' + req.params.id + 'values ' +  req.body.values);
};
