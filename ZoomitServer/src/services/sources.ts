import { Request, Response } from 'express';

export const getAllSources = (req:Request, res: Response) => {
    res.send('GET all sources');
};

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
