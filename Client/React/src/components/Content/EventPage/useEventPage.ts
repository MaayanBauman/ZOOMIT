import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import Event, { AuthoreDetailsEvent } from 'models/Event/Event';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import { convertEvent } from 'utils/EventsUtil/EventsUtil'
import useEventCard from '../EventsPage/EventCard/useEventCard';

const useEventPage = (): useEventPageOutCome => {

    const user = useSelector<StoreStateType, User>(state => state.user);
    const [event, setEvent] = useState<Event>();
    const [isRegistered, setIsRegistered] = useState<boolean | undefined>();
    const [authorDetails, setAuthoreDetails] = useState<AuthoreDetailsEvent>();
    const [authorIsZoomer, setAuthorIsZoomer] = useState(false);
    const { getUserById, getSourceById } = useEventCard();

    useEffect(() => {
        if (event) {
            setIsRegistered(user.registerd_events.some(registerd_event => registerd_event["eventId"] === event.id));
        }
    }, [event, user]);

    const getEventById = (id: string) => {
        axios.get(`/events/${id}`).then(async (result: any) => {
            setEvent(convertEvent(result.data));
            if (result.data.zoomer_id) {
                const zoomer = await getUserById(result.data.zoomer_id);
                if (zoomer) {
                    setAuthoreDetails({
                        _id: zoomer._id,
                        name: zoomer.full_name,
                        photograph: zoomer.photograph,
                        zoomer_is_active: zoomer.user_type === 'zoomer',
                    })
                    setAuthorIsZoomer(true);
                }
            } else if (result.data.source_id) {
                const source = await getSourceById(result.data.source_id);
                if (source) {
                    setAuthoreDetails({
                        _id: source._id,
                        name: source.name,
                        photograph: source.photograph,
                        zoomer_is_active: true,
                    })
                    setAuthorIsZoomer(false);
                }
            }
        }).catch((error: any) => (
            console.log(error)
        ));
    }

    return {
        event,
        isRegistered,
        getEventById,
        authorDetails,
        authorIsZoomer,
    }
}

interface useEventPageOutCome {
    event: Event | undefined,
    isRegistered: boolean | undefined,
    getEventById: Function,
    authorDetails: AuthoreDetailsEvent | undefined,
    authorIsZoomer: boolean,
}

export default useEventPage;