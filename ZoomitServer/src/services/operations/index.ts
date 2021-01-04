import doOperation from '../../repositories/mongo/operation';
import { IOperationBuilder } from './types';

const getAllObjects = (collectionName: string) => 
    doOperation(collectionName, collection => collection.find({}).toArray(), 'error');

const getObjectsBySubsetFiled = (collectionName: string, objField: string, subset: string[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $all: subset } } 
    ).toArray(), 'error');
    
const getObjectsInSubsetFiled = (collectionName: string, objField: string, subset: string[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $in: subset } }
    ).toArray(), 'error');

const getObjectById = (collectionName: string, objId: string, id: string) =>
    doOperation(collectionName, collection => collection.findOne(
        { [objId]: id }
    ), 'error');

const createObject = (collectionName: string, obj: any) =>
    doOperation(collectionName, collection => collection.insertOne(obj), 'error');

const createObjects = (collectionName: string, objects: any[]) =>
    doOperation(collectionName, collection => collection.insertMany(objects), 'error');

const addUniqueValuesToArray = (collectionName: string, objId: string, id: string, objField: string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { [objId]: id }, 
        { $addToSet: { [objField]: { $each: values } } }, 
        { returnOriginal: false }
    ), 'error');

const addValuesToArray = (collectionName: string, objId: string, id: string, objField: string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { [objId]: id }, 
        { $push: { [objField]: { $each: values } } }, 
        { returnOriginal: false }
    ), 'error');

const deleteObject = (collectionName: string, objId: string, id: string) =>
    doOperation(collectionName, collection => collection.deleteOne({ [objId]: id }), 'error');

const deleteValuesFromArray = (collectionName: string, objId: string, id: string, objField:string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { [objId]: id },
        { $pullAll: { [objField]: values } },
        { returnOriginal: false }
    ), 'error');

const updateObject = (collectionName: string, objId: string, id: string, obj: any) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { [objId]: id },
        { $set: obj },
        { returnOriginal: false }
    ), 'error');

export default <T>(): IOperationBuilder<T> => ({
    getAllObjects,
    getObjectsBySubsetFiled,
    getObjectsInSubsetFiled,
    getObjectById,
    createObject,
    createObjects,
    addUniqueValuesToArray,
    addValuesToArray,
    deleteObject,
    deleteValuesFromArray,
    updateObject
});
