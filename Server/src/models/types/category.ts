import { ObjectId } from "mongodb";

export interface ICategory {
    _id: ObjectId;
    name: string;
}
