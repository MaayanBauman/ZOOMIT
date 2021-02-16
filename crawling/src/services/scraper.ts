import axios from 'axios';
import cheerio from 'cheerio';

import {IEvent}  from '../models/types/event';

const scrape = async () => {
    let event: IEvent;

    const page = await axios.get('https://screenz.live/categories/psychology')    
    const $ = cheerio.load(page.data);    
    const zooms = $('div[class^="eventsGrid"]');
    zooms.each(() => {
        // $('div[class^="event"]', this).each((num, elemnt) => {
            $('p[class*="live"]', this).each((num, e: cheerio.TagElement) => {
               let sybling: cheerio.TagElement = e.nextSibling as cheerio.TagElement;
               console.log(sybling.childNodes[0].data);
               sybling = sybling.nextSibling as cheerio.TagElement;
               let childNode : cheerio.TagElement[] = sybling.childNodes as cheerio.TagElement[];
               childNode = childNode.
               childNode.map(child =>{
                console.log(child.nodeValue);
               })
            });
            })
        // });     
};

export default scrape;