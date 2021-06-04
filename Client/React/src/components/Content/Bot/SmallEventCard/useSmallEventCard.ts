import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';
import RegisterdEvent from 'models/Event/RegisterdEvent';
import { setUser } from 'redux/User/userActionCreator';

const useSmallEventCard = (): useSmallEventCardOutCome => {
    const currUser = useSelector<StoreStateType, User>(state => state.user);

    const setUserRating = async (userId: string, eventId: string, rating: number) => {
        const eventIndexInUserRegisteredList: number = currUser.registerd_events.findIndex(registerd_event => registerd_event.eventId === eventId);
        if (eventIndexInUserRegisteredList !== -1){
            axios.put(`/users/${userId}/event/${eventId}/rating`,{ rating, eventIndex: eventIndexInUserRegisteredList})
            .then(() => {
                const newRegisteredEvent: RegisterdEvent = { eventId, rating };
                let newRegisteredEvents = [...currUser.registerd_events];
                newRegisteredEvents[eventIndexInUserRegisteredList] = newRegisteredEvent
                setUser({ ...currUser, registerd_events: [...newRegisteredEvents] });
            });
        }
    }

    return {
        setUserRating,
        currUser,
    }
}

interface useSmallEventCardOutCome {
    setUserRating: Function,
    currUser: User,
}

export default useSmallEventCard;