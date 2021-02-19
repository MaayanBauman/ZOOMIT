import Event, {FullEvent} from "./Event";

export interface EventsByFullCategories  { 
    [key: string]: FullEvent[], 
}
export interface EventsByCategories  { 
    [key: string]: Event[], 
}


export default EventsByCategories;
