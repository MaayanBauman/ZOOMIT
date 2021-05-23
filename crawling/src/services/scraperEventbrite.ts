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
  
    let page = await axios.get('https://www.eventbrite.com/d/online/free--fashion--events--next-month/tel-aviv/?page=1');   
    let $ = cheerio.load(page.data);

    const zooms = $('div.search-main-content').find('ul').find('article').find('div.eds-event-card-content__primary-content');
    zooms.each(async (index, element) => {
        if(index % 2 !== 0){
            let newEvent = {
                title: element.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].data,
                description:  '',
                zoom_link: element.childNodes[0].attribs.href,
                password: '',
                start_time: new Date(element.childNodes[1].childNodes[0].data),
                end_time: null,
                max_registers: 100,
                category: '60aa9474d874a74294485476',
                price: 0,
                source_id: '609987b4c8bdff2acc6844dd',
                registered_users: []
            };
    
            page = await axios.get(newEvent.zoom_link);
            $ = await cheerio.load(page.data); 
            let description = $('div.has-user-generated-content').find('p');

            let date = $('div.event-details__data').find('meta');
            console.log(date);
            newEvent.description = description[0].children[0].data;
            newEvent.start_time = new Date(date[0].attribs.content);
            newEvent.end_time =   new Date(date[1].attribs.content);
            //newEvent.end_time.setHours( newEvent.end_time.getHours() + 2)
    
            const eventToSave = new EventModel(newEvent);
            eventToSave.save((error)=>{
                //console.log(error);
            })
        } 
    });
};

export default scrape;