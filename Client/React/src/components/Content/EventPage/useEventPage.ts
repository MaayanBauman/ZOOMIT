import { useState } from 'react';

import axios from 'utils/axios';
import Event from 'models/Event/Event';

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

const useEventPage = () : useEventPageOutCome  => {
    const [event, setEvent] = useState<Event>();

    const getEventById = (id:string) => {
        axios.get(`/events/${id}`).then((result : any) => {
           setEvent(convertEvent(result.data));
         }).catch((error: any)=> (
            console.log(error)
        ));
    }
    
    return {
        event,
        getEventById
    }
}


interface useEventPageOutCome {
    event: Event | undefined,
    getEventById: Function,
}

export default useEventPage;