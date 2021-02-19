import { useState, useEffect } from 'react';

import axios from 'utils/axios';
import User from 'models/User/User';
import Event, {FullEvent} from 'models/Event/Event';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import EventsFilter from 'models/Event/EventsFilter';
import { convertEvent, convertFullEvent } from 'utils/EventsUtil/EventsUtil'

const useEventsPage = () : useEventsPageOutCome  => {

    const [events, setEvents] = useState<FullEvent[]>([]);
    const [zoomers, setZoomers] = useState<User[]>([]);

    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);
    const eventsFilters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters);
    
    const getAllEvents = () => {
        axios.get('/events/join')
        .then((result : any) => {
            const eventsResult = result.data.map(convertFullEvent);
           setEvents(eventsResult);
         })
        .catch((error: any)=> (
            console.log(error)
        ));
    }

    const getAllZoomers = () => {
        axios.get('/users/types/zoomer')
        .then((result : any) => {
           setZoomers(result.data);
         })
        .catch((error: any)=> (
            console.log(error)
        ));
    }

    const getEventByTitle = (title:string) => {
        axios.get(`/events/title/${title}`).then((result : any) => {
            const eventsResult = result.data.map(convertEvent);
           setEvents(eventsResult);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    const getEventByFilters = () => {
        axios.post(`/events/getByFilters/join`,{ data: eventsFilters }).then((result : any) => {
            const eventsResult = result.data.map(convertFullEvent);
           setEvents(eventsResult);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    useEffect(() => {
        getAllZoomers();
        getEventByFilters();
    }, []);
    
    return {
        events,
        zoomers,
        categories,
        getEventByTitle,
        getAllEvents,
        getEventByFilters,
    }
}

interface useEventsPageOutCome {
    events: FullEvent[],
    zoomers: User[],
    categories: Category[],
    getEventByTitle: Function,
    getAllEvents: Function,
    getEventByFilters: Function,
}

export default useEventsPage;