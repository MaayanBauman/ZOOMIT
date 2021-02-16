import axios from 'axios';
import cheerio from 'cheerio';

import {IEvent}  from '../models/types/event';

const scrape = async () => {
    let events: IEvent[]| undefined = [];

    const page = await axios.get('https://screenz.live/categories/psychology')    
    const $ = cheerio.load(page.data);    
    const zooms = $('div[class^="eventsGrid"]');
    zooms.each(() => {
            $('p[class*="live"]', this).each((num, e: cheerio.TagElement) => {
                let newEvent : IEvent = {
                    title: '',
                    description:  '',
                    zoom_link: '',
                    password: '',
                    start_time: null,
                    end_time: null,
                    max_registers: 100,
                    category: '602c1aef6908bb23ebfc8766',
                    price: 0,
                    source_id: '602c1b5048cf724be45cc78e'
                };
               let sybling: cheerio.TagElement = e.nextSibling as cheerio.TagElement;
               console.log(sybling.childNodes[0].data);
               newEvent.title = sybling.childNodes[0].data;

               sybling = sybling.nextSibling as cheerio.TagElement;
               let childNode : cheerio.TagElement[] = sybling.childNodes as cheerio.TagElement[];
               childNode = childNode[0].childNodes as cheerio.TagElement[];
               childNode.map((child: cheerio.TagElement, index) =>{
                   const dates: cheerio.TagElement[] =  child.childNodes as cheerio.TagElement[];
                   if(index == 0){
                       console.log('time:' + dates[0]?.nodeValue);
                       var parts =dates[0]?.nodeValue.split(':');
                       newEvent.start_time = new Date(2000, 1, 1, +parts[0],+parts[1]);
                   }
                   else if(index == 1) {
                       console.log('date:' + dates[0]?.nodeValue)
                       var parts =dates[0]?.nodeValue.split('.');
                       var hour = newEvent.start_time.getHours();
                       var minute =  newEvent.start_time.getMinutes();
                       newEvent.start_time = new Date(2000 + (+parts[2]), +parts[1] - 1, +parts[0], hour, minute);
                   }
               })
               events.push(newEvent);
            });
            })     

            console.log(events);
};

export default scrape;