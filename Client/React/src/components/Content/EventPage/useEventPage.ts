import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Event from 'models/Event/Event';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import { convertEvent } from 'utils/EventsUtil/EventsUtil'

const useEventPage = (): useEventPageOutCome => {

    const user = useSelector<StoreStateType, User>(state => state.user);
    const [event, setEvent] = useState<Event>();
    const [isRegistered, setIsRegistered] = useState<boolean | undefined>();

    useEffect(() => {
        if (event) {
            setIsRegistered(user.registerd_events.includes(event?.id));
        }
    }, [event, user]);

    const getEventById = (id: string) => {
        axios.get(`/events/${id}`).then((result: any) => {
            setEvent(convertEvent(result.data));
        }).catch((error: any) => (
            console.log(error)
        ));
    }

    return {
        event,
        isRegistered,
        getEventById,
    }
}

interface useEventPageOutCome {
    event: Event | undefined,
    isRegistered: boolean | undefined,
    getEventById: Function,
}

export default useEventPage;