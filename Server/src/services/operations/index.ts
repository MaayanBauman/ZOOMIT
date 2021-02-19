import { ObjectID } from 'mongodb';
import doOperation from '../../repositories/mongo/operation';
import { IOperationBuilder } from './types';

declare function emit(k: undefined, v: any | undefined): any;

const getAllObjects = (collectionName: string) => 
    doOperation(collectionName, collection => collection.find({}).toArray(), 
                `Fail to get all the objects from ${collectionName}`);

const getAllObjectsByQuery = (collectionName: string, query: object) => {
    return doOperation(collectionName, collection => collection.find(query).toArray(), 
    `Fail to get all the objects from ${collectionName}`);
}

const getObjectsBySubsetFiled = (collectionName: string, objField: string, subset: any[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $all: subset } } 
    ).toArray(), `Fail to get the objects with ${objField}= ${subset} from ${collectionName}`);
    
const getObjectsInSubsetFiled = (collectionName: string, objField: string, subset: any[]) =>
    doOperation(collectionName, collection => collection.find(
        { [objField]: { $in: subset } }
    ).toArray(), `Fail to get the objects with ${objField} in ${subset} from ${collectionName}`);

const getCountObjectsByFiled = (collectionName: string, objField: string) =>
    doOperation(collectionName, collection => collection.aggregate([
        { $group: { _id: `$${objField}`, count: { $sum: 1 }} }
    ]).toArray(), `Fail to get the count objects with ${objField} from ${collectionName}`);
    
const getSumByFiled = (collectionName: string, sumField: string, objField: string) => {
    var mapper = function() { 
        emit(this.category, this.price);
    };
    var reducer = function(obj: any, sumValues: any) { 
        return sumValues.reduce((total: number, sum: number) => total + sum) ;
    };

    return doOperation(collectionName, collection => collection.mapReduce(
        mapper, 
        reducer, 
        { out: { inline: 1 } }
    ), `Fail to get the sum of ${sumField} by ${objField} from ${collectionName}`)
};

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

const getAllObjectsWithJoin = (collectionName: string, 
    firstFromCollection: string, firstLocalField: string, firstForeignField:string, firstAsFieldName: string,
    secondFromCollection: string, secondLocalField: string, secondForeignField:string, secondAsFieldName: string) => {   
    return doOperation(collectionName, (collection) => {
        return collection.aggregate([
            {
                $addFields: {
                  source_id: {          
                    $toObjectId: `$${firstLocalField}`
                  },
                  zoomer_id: {          
                    $toObjectId: `$${secondLocalField}`
                  }
                }
            },
            { $lookup:
               {
                 from: firstFromCollection,
                 localField: firstLocalField,
                 foreignField: firstForeignField,
                 as: firstAsFieldName
               }
             },
             { $lookup:
                {
                  from: secondFromCollection,
                  localField: secondLocalField,
                  foreignField: secondForeignField,
                  as: secondAsFieldName
                }
              },
            ]).toArray()
    }, 
        `Fail to get all the objects from ${collectionName}`);
}

const getAllObjectsWithJoinByQuery = (collectionName: string,  query: object,
    firstFromCollection: string, firstLocalField: string, firstForeignField:string, firstAsFieldName: string,
    secondFromCollection: string, secondLocalField: string, secondForeignField:string, secondAsFieldName: string) => {   
    return doOperation(collectionName, (collection) => {
        return collection.aggregate([
            {
                $match: query
            },
            {
                $addFields: {
                  source_id: {          
                    $toObjectId: `$${firstLocalField}`
                  },
                  zoomer_id: {          
                    $toObjectId: `$${secondLocalField}`
                  }
                }
            },
            { $lookup:
               {
                 from: firstFromCollection,
                 localField: firstLocalField,
                 foreignField: firstForeignField,
                 as: firstAsFieldName
               }
             },
             { $lookup:
                {
                  from: secondFromCollection,
                  localField: secondLocalField,
                  foreignField: secondForeignField,
                  as: secondAsFieldName
                }
              },
            ]).toArray()
    }, 
        `Fail to get all the objects from ${collectionName}`);
}

const getObjectsByIdWithJoin =  (collectionName: string, ids: Array<string> 
    ,firstFromCollection: string, firstLocalField: string, firstForeignField:string, firstAsFieldName: string,
    secondFromCollection: string, secondLocalField: string, secondForeignField:string, secondAsFieldName: string) => { 
        return doOperation(collectionName, (collection) => {
            return collection.aggregate([
                {
                    $match: { '_id': { $in: ids.map((id) => new ObjectID(id)) } }
                },
                {
                    $addFields: {
                      source_id: {          
                        $toObjectId: `$${firstLocalField}`
                      },
                      zoomer_id: {          
                        $toObjectId: `$${secondLocalField}`
                      }
                    }
                },
                { $lookup:
                   {
                     from: firstFromCollection,
                     localField: firstLocalField,
                     foreignField: firstForeignField,
                     as: firstAsFieldName
                   }
                 },
                 { $lookup:
                    {
                      from: secondFromCollection,
                      localField: secondLocalField,
                      foreignField: secondForeignField,
                      as: secondAsFieldName
                    }
                  },
                ]).toArray()
        }, 
            `Fail to get all the objects from ${collectionName}`)
}
 
export default <T>(): IOperationBuilder<T> => ({
    getAllObjects,
    getAllObjectsByQuery,
    getObjectsBySubsetFiled,
    getObjectsInSubsetFiled,
    getCountObjectsByFiled,
    getSumByFiled,
    getObjectsRegexFiled,
    getObjectById,
    getObjectsById,
    createObject,
    createObjects,
    addUniqueValuesToArray,
    addValuesToArray,
    deleteObject,
    deleteValuesFromArray,
    updateObject,
    getAllObjectsWithJoin,
    getAllObjectsWithJoinByQuery,
    getObjectsByIdWithJoin
});
