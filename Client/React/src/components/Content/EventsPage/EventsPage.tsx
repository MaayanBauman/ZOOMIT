import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';

import axios from 'utils/axios';
import Event from 'models/Event/Event';

const EventsPage: React.FC = (): JSX.Element => {

    const [events, setEvents] = React.useState<Event[]>();

    useEffect(()=>{
        axios.get('/events')
        .then((result : any)=> {
            const eventsResult = result.data.map((event: any)=> {
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
                    category: event.string,
                    price: +event.price.$numberDecimal,
                    source_id: event.source_id
                }
            });
           setEvents(events);
           console.log(eventsResult);
         })
        .catch((error: any)=> (
            console.log(error)
        ))
    }, [])

    return (
        <div >
            <Typography>
              אירועים
            </Typography>
        </div>
    );
}

export default EventsPage;
