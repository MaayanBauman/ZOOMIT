import { 
    InsertWriteOpResult,
    InsertOneWriteOpResult,
    FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject
} from 'mongodb';

export interface IOperationBuilder<T> {
    getAllObjects: (collectionName: string) => Promise<T[]>;
    getAllObjectsWithJoin:  (collectionName: string, firstFromCollection: string, 
        firstLocalField: string, firstForeignField:string, firstAsFieldName: string, 
        secondFromCollection: string, secondLocalField: string,secondForeignField:string, secondAsFieldName: string)=> Promise<T[]>;
    getAllObjectsWithJoinByQuery: (collectionName: string, query: object,
        firstFromCollection: string, firstLocalField: string, firstForeignField:string, firstAsFieldName: string,
        secondFromCollection: string, secondLocalField: string, secondForeignField:string, secondAsFieldName: string)=> Promise<T[]>;
    getObjectsByIdWithJoin: (collectionName: string, id: Array<string>, 
        firstFromCollection: string, firstLocalField: string, firstForeignField:string, firstAsFieldName: string,
        secondFromCollection: string, secondLocalField: string, secondForeignField:string, secondAsFieldName: string) => Promise<T>;
    getAllObjectsByQuery: (collectionName: string, query: object) => Promise<T[]>;
    getObjectsBySubsetFiled: (collectionName: string, objField: string, subset: any[]) => Promise<T[]>;
    getObjectsInSubsetFiled: (collectionName: string, objField: string, subset: any[]) => Promise<T[]>;
    getCountObjectsByFiled: (collectionName: string, objField: string) => Promise<T[]>;
    getSumByFiled: (collectionName: string, sumField: string,  objField: string) => Promise<T[]>;
    getObjectsRegexFiled: (collectionName: string, objField: string, regex: string) => Promise<T[]>;
    getObjectById: (collectionName: string, id: string) => Promise<T>;
    getObjectsById: (collectionName: string, id: Array<string>) => Promise<T>;
    createObject: (collectionName: string, obj: T) => Promise<InsertOneWriteOpResult<{ _id:any }>>;
    createObjects: (collectionName: string, objects: T[]) => Promise<InsertWriteOpResult<{ _id:any }>>;
    addUniqueValuesToArray: (collectionName: string, id: string, objField: string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    addValuesToArray: (collectionName: string, id: string, objField: string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    deleteObject: (collectionName: string, id: string) => Promise<DeleteWriteOpResultObject>;
    deleteValuesFromArray: (collectionName: string, id: string, objField:string, values: any[]) => Promise<FindAndModifyWriteOpResultObject<T>>;
    updateObject: (collectionName: string, id: string, obj: T) => Promise<FindAndModifyWriteOpResultObject<T>>;
};
