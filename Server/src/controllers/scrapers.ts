import { Request, Response, NextFunction, Handler } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export const getMoreEvents: Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("scraping");
        scraping();
    } catch (err) {
        next(err);
    }
};

const scraping = async () => {
    const page = await axios.get('https://il.funzing.com/lectures?online=1');
    const $ = cheerio.load(page.data);
    console.log("data");
    console.log(`Site HTML: ${$.html()}\n\n`)
}