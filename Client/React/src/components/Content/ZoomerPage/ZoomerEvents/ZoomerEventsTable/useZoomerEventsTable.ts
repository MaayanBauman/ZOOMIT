import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event'; 
import StoreStateType from 'redux/storeStateType';
import {setUser}  from 'redux/User/userActionCreator';
import {convertEvent} from 'utils/EventsUtil/EventsUtil';

const useZoomerEventsTable  = () : useZoomerPageOutCome  => {

    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    const [zoomerEvents, setZoomerEvents] = useState<Event[]>([]); 

    const getZoomerEvents = () => {
        axios.get(`/users/zoomer/${zoomer._id}/events`)
        .then((res)=> {
            const eventsResult = res.data.map(convertEvent);
            setZoomerEvents(eventsResult);
        })
    }

    useEffect(()=> {
        getZoomerEvents();
    }, [zoomer])

    return {
        zoomerEvents
    }
}

interface useZoomerPageOutCome {
    zoomerEvents: Event[]
}


export default useZoomerEventsTable;