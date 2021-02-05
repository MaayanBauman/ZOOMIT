import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import Event from 'models/Event/Event';
import Category from 'models/Category/Category';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import EventsFilter from 'models/Event/EventsFilter';
import { useSelector } from 'react-redux';

const convertEvent = (event: any)=> {
    return {
        id: event._id,
        title: event.title,
        description: event.description,
        zoomer_id: event.zoomer_id,
        zoom_link: event.zoom_link,
        password: event.password,
        start_time: new Date(event.start_time),
        end_time: new Date(event.end_time),
        max_registers: event.max_registers,
        registered_users: event.registered_users,
        category: event.category,
        price: +event.price.$numberDecimal,
        source_id: event.source_id
    }
};

const useEventsPage = () : useEventsPageOutCome  => {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [zoomers, setZoomers] = useState<User[]>([]);
    const eventsFilters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters);

    const getAllEvents = () => {
        axios.get('/events')
        .then((result : any) => {
            const eventsResult = result.data.map(convertEvent);
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

    const getCategories = () => {
        axios.get('/categories')
        .then((result : any) => {
            const categoriesResult = result.data.map((category: any)=> {
                return {
                    id: category._id,
                    name: category.name,
                }
            });
           setCategories(categoriesResult);
         })
        .catch((error: any) => (
            console.log(error)
        ))
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
        axios.post(`/events/getByFilters`,{ data: eventsFilters }).then((result : any) => {
            const eventsResult = result.data.map(convertEvent);
           setEvents(eventsResult);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    useEffect(() => {
        getEventByFilters();
        getCategories();
        getAllZoomers();
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
    events: Event[],
    zoomers: User[],
    categories: Category[],
    getEventByTitle: Function,
    getAllEvents: Function,
    getEventByFilters: Function,
}

export default useEventsPage;