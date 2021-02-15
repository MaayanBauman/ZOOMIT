import { useState } from 'react';

import axios from 'utils/axios';
import Event from 'models/Event/Event';
import User from 'models/User/User';
import Swal from 'sweetalert2';
import useStyles from './EventPageStyles';

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
    const classes = useStyles();

    const getEventById = (id:string) => {
        axios.get(`/events/${id}`).then((result : any) => {
           setEvent(convertEvent(result.data));
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    const registerToEvent = (user: User, event: Event) => {
        axios.put(`/users/${user._id}/events/${event.id}`, {})
        .then((result : any) => {
            Swal.fire({
                title: 'איזה כיף שנרשמת!',
                text: ',תמשיך הלאה לכל האירועים',
                icon: 'success',
                confirmButtonText: 'יאלה קח אותי',
                customClass: {
                    title: classes.swal,
                    content: classes.swal,
                    container: classes.swal
                },
              }).then(()=> {
                
              })   
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }
    
    return {
        event,
        getEventById,
        registerToEvent
    }
}


interface useEventPageOutCome {
    event: Event | undefined,
    getEventById: Function,
    registerToEvent: Function,
}

export default useEventPage;