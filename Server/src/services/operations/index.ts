import { ObjectID } from 'mongodb';
import doOperation from '../../repositories/mongo/operation';
import { IOperationBuilder } from './types';

const getAllObjects = (collectionName: string) => 
    doOperation(collectionName, collection => collection.find({}).toArray(), 
                `Fail to get all the objects from ${collectionName}`);

const getObjectsBySubsetFiled = (collectionName: string, objField: string, subset: any[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $all: subset } } 
    ).toArray(), `Fail to get the objects with ${objField}= ${subset} from ${collectionName}`);
    
const getObjectsInSubsetFiled = (collectionName: string, objField: string, subset: any[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $in: subset } }
    ).toArray(), `Fail to get the objects with ${objField} in ${subset} from ${collectionName}`);

const getObjectsRegexFiled = (collectionName: string, objField: string, regex: string) =>
    doOperation(collectionName, collection => collection.find(
    { [objField]: { $regex: regex }}
    ).toArray(), `Fail to get the objects with ${objField} in ${regex} from ${collectionName}`);

const getObjectById = (collectionName: string, id: string) => 
    doOperation(collectionName, collection => collection.findOne(
        { '_id': new ObjectID(id) }
    ), `Fail to get the object by id- ${id} from ${collectionName}`);

const getObjectsById = (collectionName: string, ids: Array<string>) => 
    doOperation(collectionName, collection => collection.find(
        { '_id': { $in: ids.map((id) => new ObjectID(id)) } }
    ).toArray(), `Fail to get the objects by ids- ${ids} from ${collectionName}`);

const createObject = (collectionName: string, obj: any) =>
    doOperation(collectionName, collection => collection.insertOne(obj), 
                `Fail to the create the object ${obj} in ${collectionName}`);

const createObjects = (collectionName: string, objects: any[]) =>
    doOperation(collectionName, collection => collection.insertMany(objects), 
                `Fail to create the objects ${objects} in ${collectionName}`);

const addUniqueValuesToArray = (collectionName: string, id: string, objField: string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { '_id': new ObjectID(id) }, 
        { $addToSet: { [objField]: { $each: values } } }, 
        { returnOriginal: false }
    ), `Fail to add the unique values ${values} to ${objField} in ${collectionName}- ${id}`);

const addValuesToArray = (collectionName: string, id: string, objField: string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { '_id': new ObjectID(id) },
        { $push: { [objField]: { $each: values } } }, 
        { returnOriginal: false }
    ), `Fail to add the values ${values} to ${objField} in ${collectionName}- ${id}`);

const deleteObject = (collectionName: string, id: string) =>
    doOperation(collectionName, collection => collection.deleteOne({ '_id': new ObjectID(id) }), 
                `Fail to delete the object ${id} from ${collectionName}`);

const deleteValuesFromArray = (collectionName: string, id: string, objField:string, values: any[]) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { '_id': new ObjectID(id) },
        { $pullAll: { [objField]: values } },
        { returnOriginal: false }
    ), `Fail to delete the values ${values} from the ${objField} in  ${collectionName}- ${id}`);

const updateObject = (collectionName: string, id: string, obj: any) =>
    doOperation(collectionName, collection => collection.findOneAndUpdate(
        { '_id': new ObjectID(id) },
        { $set: obj },
        { returnOriginal: false }
    ), `Fail to update ${id}- ${collectionName} to ${obj}`);

export default <T>(): IOperationBuilder<T> => ({
    getAllObjects,
    getObjectsBySubsetFiled,
    getObjectsInSubsetFiled,
    getObjectsRegexFiled,
    getObjectById,
    getObjectsById,
    createObject,
    createObjects,
    addUniqueValuesToArray,
    addValuesToArray,
    deleteObject,
    deleteValuesFromArray,
    updateObject
});
