import { 
    InsertWriteOpResult,
    InsertOneWriteOpResult,
    FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject
} from 'mongodb';

export interface IOperationBuilder<T> {
    getAllObjects: (collectionName: string) => Promise<T[]>;
    getObjectsBySubsetFiled: (collectionName: string, objField: string, subset: string[]) => Promise<T[]>;
    getObjectsInSubsetFiled: (collectionName: string, objField: string, subset: string[]) => Promise<T[]>;
    getObjectById: (collectionName: string, objId: string, id: string) => Promise<T>;
    createObject: (collectionName: string, obj: T) => Promise<InsertOneWriteOpResult<{ _id:any }>>;
    createObjects: (collectionName: string, objects: T[]) => Promise<InsertWriteOpResult<{ _id:any }>>;
    addUniqueValuesToArray: (collectionName: string, objId: string, id: string, objField: string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    addValuesToArray: (collectionName: string, objId: string, id: string, objField: string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    deleteObject: (collectionName: string, objId: string, id: string) => Promise<DeleteWriteOpResultObject>;
    deleteValuesFromArray: (collectionName: string, objId: string, id: string, objField:string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    updateObject: (collectionName: string, objId: string, id: string, obj: T) => Promise<FindAndModifyWriteOpResultObject<T>>;
};
