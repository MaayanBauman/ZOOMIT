import { Decimal128, ObjectId } from "mongodb";

export interface IEvent {
    _id: ObjectId;
    title: string;
    description: string;
    zoomer_id: ObjectId;
    zoom_link: string;
    password: string
    start_time: Date;
    end_time: string;
    max_registers: number;
    registered_users: Array<string>
    category: ObjectId;
    price: Decimal128;
    source_id: ObjectId;
}
