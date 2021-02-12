import Event from "models/Event/Event";
import EventsByCategories from "models/Event/EventsByCategories";

export const getEventsByCatgory = (events: Event[]) => {
    let eventsByCatgory : EventsByCategories = {};

    events.forEach((event: Event) => {
        eventsByCatgory[event.category] ? eventsByCatgory[event.category].push(event) : eventsByCatgory[event.category] = [event] ;
    })
    return eventsByCatgory;
}

