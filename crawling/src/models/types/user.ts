import { ObjectId } from "mongodb";
import { IRegisterdEvent } from "./registerd_event";

export interface IUser {
    _id: ObjectId;
    full_name: string;
    email: string;
    user_type: string;
    favorite_categories: Array<string>;
    photograph: string;
    approved_date: Date;
    description: string;
    is_waiting_for_approval: boolean;
    owned_events: Array<string>;
    registerd_events: Array<IRegisterdEvent>;
}
