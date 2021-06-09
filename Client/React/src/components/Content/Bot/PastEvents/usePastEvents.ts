import { useState } from 'react';
import {useSelector} from 'react-redux';

import axios from 'utils/axios';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import { FullEvent } from 'models/Event/Event';
import { convertFullEvent} from 'utils/EventsUtil/EventsUtil';

const usePastEvents = () : usePastEventsOutCome  => {
    const user = useSelector<StoreStateType, User>(state => state.user);
    const [pastEvents, setPastEvents] = useState<FullEvent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getPastUserEvents = (userId: string) => {
        axios.get(`/users/${userId}/events/join`, { params: { hideSpinner: true } })
        .then((result : any)=> {
            const eventsResult = result.data.map(convertFullEvent)
                .filter((event: FullEvent) =>
                    (event.start_time < new Date()) &&
                    !(user.registerd_events.find(registerd_event => registerd_event.eventId === event.id)?.rating)
                );
            setPastEvents(eventsResult);
        })
        .catch((error: any) => {
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    
    return {
        user,
        pastEvents,
        getPastUserEvents,
        isLoading,
    }
}

interface usePastEventsOutCome {
    user: User,
    pastEvents: FullEvent[],
    getPastUserEvents: Function,
    isLoading: boolean,
}

export default usePastEvents;