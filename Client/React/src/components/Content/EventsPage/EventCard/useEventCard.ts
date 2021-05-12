import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';
import RegisterdEvent from 'models/Event/RegisterdEvent';
import { setUser } from 'redux/User/userActionCreator';

const useEventCard = (): useEventCardOutCome => {
    const categories = useSelector<StoreStateType, Category[]>(state => state.categories);
    const currUser = useSelector<StoreStateType, User>(state => state.user);

    const getSourceById = async (sourceId: string) => {
        const { data } = await axios.get(`/sources/${sourceId}`);
        return data;
    }

    const getUserById = async (userId: string) => {
        const { data } = await axios.get(`/users/${userId}`);
        return data;
    }
    const setUserRating = async (userId: string, eventId: string, rating: number) => {
        const eventIndexInUserRegisteredList: number = currUser.registerd_events.findIndex(registerd_event => registerd_event.eventId === eventId);
        if (eventIndexInUserRegisteredList !== -1){
            axios.put(`/users/${userId}/event/${eventId}/rating`,{ rating, eventIndex: eventIndexInUserRegisteredList})
            .then(() => {
                const newRegisteredEvent: RegisterdEvent = { eventId, rating };
                let newRegisteredEvents = [...currUser.registerd_events];
                newRegisteredEvents[eventIndexInUserRegisteredList] = newRegisteredEvent
                setUser({ ...currUser, registerd_events: [...newRegisteredEvents] });
            })
        }
    }

    return {
        getUserById,
        getSourceById,
        setUserRating,
        categories,
        currUser,
    }
}

interface useEventCardOutCome {
    getUserById: Function,
    getSourceById: Function,
    setUserRating: Function,
    categories: Category[],
    currUser: User,
}

export default useEventCard;