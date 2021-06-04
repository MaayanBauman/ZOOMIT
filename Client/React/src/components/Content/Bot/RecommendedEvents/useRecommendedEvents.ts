import { useState } from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import { FullEvent } from 'models/Event/Event';
import { convertFullEvent} from 'utils/EventsUtil/EventsUtil';

const useRecommendedEvents = () : useRecommendedEventsOutCome  => {
    const user = useSelector<StoreStateType, User>(state => state.user);
    const [recommendedEvents, setRecommendedEvents] = useState<FullEvent[]>([]);

    const getRecommendedUserEvents = (userId: string) => {
        axios.get(`/users/${userId}/recommended/2`)
        .then((result : any)=> {
            const eventsResult = result.data.map(convertFullEvent);
            console.log(eventsResult);
            setRecommendedEvents(eventsResult);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }
    
    return {
        user,
        recommendedEvents,
        getRecommendedUserEvents,
    }
}

interface useRecommendedEventsOutCome {
    user: User,
    recommendedEvents: FullEvent[],
    getRecommendedUserEvents: Function,
}

export default useRecommendedEvents;