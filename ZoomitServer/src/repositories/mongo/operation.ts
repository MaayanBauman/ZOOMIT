import { Collection, Db, MongoClient } from 'mongodb';
import { IOperation } from './types';
import config from '../../config';

const doOperation = async (collectionName: string, operation: IOperation, logMessage: string) => {
    let client: MongoClient;
    
    try {
        client = await MongoClient.connect(config.mongoConfig.connectionString);
        const dbClient: Db = client.db(config.mongoConfig.dbName);
        const collection: Collection = dbClient.collection(collectionName);
        return await operation(collection);
    } catch (err) {
        throw Error(logMessage + ': ' + err);
    } finally {
        if (client)
            await client.close();
    }
}

export default doOperation;
