import {useSelector} from 'react-redux';
import {useEffect, useState, useRef} from 'react';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import Event from 'models/Event/Event'; 
import StoreStateType from 'redux/storeStateType';
import EventsFilter from 'models/Event/EventsFilter';
import {convertEvent} from 'utils/EventsUtil/EventsUtil';

const useZoomerProfileEvents  = ({ zoomer }: Props) : useZoomerPageOutCome  => {

    const eventsFilters = useSelector<StoreStateType, EventsFilter>(state => state.eventsFilters); 
    const [zoomerEvents, setZoomerEvents] = useState<Event[]>([]); 
    const zoomerEventsRef = useRef(zoomer?.owned_events);
    const eventsFiltersRef = useRef(eventsFilters);

    const getZoomerEvents = () => {
        axios.get(`/users/zoomer/${zoomer?._id}/events`)
        .then((res)=> {
            const eventsResult = res.data.map(convertEvent);
            setZoomerEvents(eventsResult);
        })
    }

    const getEventByFilters = () => {
        if(eventsFiltersRef.current !== eventsFilters){
            axios.post(`/events/getByFilters`,{ data: {...eventsFilters, zoomer_id: zoomer?._id}}).then((result : any) => {
                const eventsResult = result.data.map(convertEvent);
                setZoomerEvents(eventsResult);
             }).catch((error: any)=> (
                console.log(error)
            ));
        }
    }

    useEffect(()=> {
        if(zoomerEventsRef.current !== zoomer?.owned_events) 
            getZoomerEvents();
    }, [zoomer])

    return {
        zoomerEvents,
        getEventByFilters
    }
}

interface Props {
    zoomer: User | undefined;
}

interface useZoomerPageOutCome {
    zoomerEvents: Event[],
    getEventByFilters: Function
}

export default useZoomerProfileEvents;