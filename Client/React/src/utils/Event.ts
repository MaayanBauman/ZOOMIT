import Event, {FullEvent} from "models/Event/Event";
import {EventsByCategories, EventsByFullCategories} from "models/Event/EventsByCategories";

export const getFullEventsByCatgory = (events: FullEvent[]) => {
    let eventsByCatgory : EventsByFullCategories = {};

    events.forEach((event: FullEvent) => {
        eventsByCatgory[event.category] ? eventsByCatgory[event.category].push(event) : eventsByCatgory[event.category] = [event] ;
    })
    return eventsByCatgory;
}


export const getEventsByCatgory = (events: Event[]) => {
    let eventsByCatgory : EventsByCategories = {};

    events.forEach((event: Event) => {
        eventsByCatgory[event.category] ? eventsByCatgory[event.category].push(event) : eventsByCatgory[event.category] = [event] ;
    })
    return eventsByCatgory;
}

