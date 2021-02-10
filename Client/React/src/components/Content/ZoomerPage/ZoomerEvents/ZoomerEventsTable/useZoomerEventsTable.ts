import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event'; 
import StoreStateType from 'redux/storeStateType';
import {setUser}  from 'redux/User/userActionCreator';
import {convertEvent} from 'utils/EventsUtil/EventsUtil';

const useZoomerEventsTable  = ({isEventEditorOpen}: Props) : useZoomerPageOutCome  => {

    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    const [zoomerEvents, setZoomerEvents] = useState<Event[]>([]); 
    const zoomerEventsRef = useRef(zoomer.owned_events);

    const getZoomerEvents = () => {
        axios.get(`/users/zoomer/${zoomer._id}/events`)
        .then((res)=> {
            const eventsResult = res.data.map(convertEvent);
            setZoomerEvents(eventsResult);
        })
    }

    useEffect(()=> {
        getZoomerEvents();
    }, [])

    useEffect(()=> {
        if(zoomerEventsRef.current !== zoomer.owned_events && !isEventEditorOpen) 
            getZoomerEvents();
    }, [zoomer,isEventEditorOpen])

    return {
        zoomerEvents
    }
}

interface useZoomerPageOutCome {
    zoomerEvents: Event[]
}

interface Props {
    isEventEditorOpen : boolean
}


export default useZoomerEventsTable;