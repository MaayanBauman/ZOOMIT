import { Collection, Cursor } from 'mongodb';

export type IOperation = (collection: Collection) => Promise<any> | Cursor<any>;