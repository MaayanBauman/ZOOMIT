import { Binary, ObjectId } from "mongodb";
import { ICategory } from "./category";
import { IEvent } from "./event";

export interface IUser {
    _id: ObjectId;
    full_name: string;
    email: string;
    user_type: string;
    favorite_categories: Array<ICategory>;
    owned_events: Array<IEvent>;
    photograph: Binary;
    approved_date: Date;
    description: string;
    is_waiting_for_approval: boolean;
    registerd_events: Array<IEvent>;
}
