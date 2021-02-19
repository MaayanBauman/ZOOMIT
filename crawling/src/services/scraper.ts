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

const baseURl: string = 'https://screenz.live';
const scrape = async () => {
    let events= [];
  
    let page = await axios.get('https://screenz.live/categories/relations');   
    let $ = cheerio.load(page.data);    
    const zooms = $('div[class^="eventsGrid"]');
    await zooms.each(async () => {
            $('p[class*="live"]', this).each(async (num, e: cheerio.TagElement) => {
                let newEvent = {
                    title: '',
                    description:  '',
                    zoom_link: '',
                    password: '',
                    start_time: null,
                    end_time: null,
                    max_registers: 100,
                    category: '5ff1ca584292da45f9673de4',
                    price: 0,
                    source_id: '602c1b5048cf724be45cc78e',
                    registered_users: []
                };
                let parent: cheerio.TagElement =  e.parentNode as cheerio.TagElement;
                parent = parent.parentNode as cheerio.TagElement;
                let aTag: cheerio.TagElement = parent.childNodes[1] as cheerio.TagElement;
                newEvent.zoom_link= baseURl + aTag.attribs.href;


                let sybling: cheerio.TagElement = e.nextSibling as cheerio.TagElement;
                newEvent.title = sybling.childNodes[0].data;

                sybling = sybling.nextSibling as cheerio.TagElement;

                let childNode : cheerio.TagElement[] = sybling.childNodes as cheerio.TagElement[];
                childNode = childNode[0].childNodes as cheerio.TagElement[];
                childNode.map((child: cheerio.TagElement, index) =>{
                    const dates: cheerio.TagElement[] =  child.childNodes as cheerio.TagElement[];
                    if(index == 0){
                        var parts =dates[0]?.nodeValue.split(':');
                        newEvent.start_time = new Date(2000, 1, 1, +parts[0],+parts[1]);
                    }
                    else if(index == 1) {
                        var parts =dates[0]?.nodeValue.split('.');
                        var hour = newEvent.start_time.getHours();
                        var minute =  newEvent.start_time.getMinutes();
                        newEvent.start_time = new Date(2000 + (+parts[2]), +parts[1] - 1, +parts[0], hour, minute);
                        newEvent.end_time =  new Date(newEvent.start_time);
                    }
                });
                page = await axios.get(newEvent.zoom_link);
                $ = cheerio.load(page.data); 
                let description =  $('div[class^="description"]')[0];
                let childrenP : cheerio.TagElement;
                
                if(description.childNodes.length == 1) {
                    childrenP = description.childNodes[0] as cheerio.TagElement;
                    childrenP = childrenP.childNodes[0] as cheerio.TagElement;
                    newEvent.description = childrenP.nodeValue;

                } else{
                    childrenP = description.childNodes[1] as cheerio.TagElement;
                    childrenP = childrenP.childNodes[0] as cheerio.TagElement;
                    newEvent.description = childrenP.nodeValue;
                }

                let detailes =  $('p[class*="icon-description"]');
                let duration = +detailes[0].childNodes[0].nodeValue.match('[0-9]+')[0];;
                let price = +detailes[2].childNodes[0].nodeValue.match('[0-9]+')[0];
                newEvent.price = price;
                newEvent.end_time.setHours(newEvent.end_time.getHours() + duration);

                const eventToSave = new EventModel(newEvent);
                eventToSave.save((error)=>{
                    console.log(error);
                })
                // events.push(newEvent);
                // console.log(newEvent);
            });
            })   
};

export default scrape;