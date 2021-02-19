import { Schema } from 'mongoose';

export const eventSchema = new Schema({
    title:  String,
    description: String,
    zoom_link:   String,
    password: String,
    start_time: Date,
    end_time: Date,
    max_registers: Number,
    price: Number,
    source_id: String,
    category: String,
    registered_users: [String]
  }, {collection: 'events'});
