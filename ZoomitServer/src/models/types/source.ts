import { ObjectId } from "mongodb";

export interface ISource {
    _id: ObjectId;
    name: string;
    url: string;
}
