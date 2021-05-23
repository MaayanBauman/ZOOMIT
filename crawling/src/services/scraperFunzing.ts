// @ts-nocheck
import axios from 'axios';
import cheerio from 'cheerio';
import mongoose from 'mongoose';

import { connection } from '../server';
import { IEvent, eventSchema }  from '../models/types/event';
require('dotenv').config();

mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const EventModel = mongoose.model('events', eventSchema);

const baseURl: string = 'https://il.funzing.com/';
const scrape = async () => {
    let events= [];
  
    let page = await axios.get('https://www.eventbrite.com/d/online/music--events--next-week/?page=1');   
    let $ = cheerio.load(page.data);

    const zooms = $('div.search-main-content').find('ul').find('article').find('div.eds-event-card-content__primary-content');
    zooms.each(async (index, element) => {
        let newEvent = {
            title: element.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data,
            description:  '',
            zoom_link: element.childNodes[0].attribs.href,
            password: '',
            start_time: new Date(element.childNodes[1].childNodes[0].data),
            end_time: null,
            max_registers: 100,
            category: '5ff1ca484292da45f9673de3',
            price: 0,
            source_id: '609987b4c8bdff2acc6844dd',
            registered_users: []
        };

        page = await axios.get(newEvent.zoom_link);
        $ = cheerio.load(page.data); 
        let description = $('div.has-user-generated-content').find('p');
        newEvent.description = description[0].children[0].data;
        newEvent.end_time =  newEvent.start_time;
        newEvent.end_time.setHours( newEvent.end_time.getHours() + 2)

        const eventToSave = new EventModel(newEvent);
        eventToSave.save((error)=>{
            console.log(error);
        })
    });
};

export default scrape;