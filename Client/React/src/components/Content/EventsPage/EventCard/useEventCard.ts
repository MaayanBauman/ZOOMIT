import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';
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

    const setLike = (event : any) => {
        const EventId = event.target.value;
        const likedEvents = currUser.liked_events || [];
        let userLikedEvents = [];
        if (!likedEvents?.find((value) => value === EventId)) {
            userLikedEvents = [...likedEvents, event.target.value];
        } else {
            userLikedEvents = likedEvents.filter((item: string) => item !== EventId);
        }
        const updatedUser = { ...currUser, liked_events: userLikedEvents }
        axios.put(`/users/${currUser._id}`, { user: updatedUser })
        .then((result : any) => {
            setUser(result.data.value)
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }

    return {
        getUserById,
        getSourceById,
        categories,
        currUser,
        setLike,
    }
}

interface useEventCardOutCome {
    getUserById: Function,
    getSourceById: Function,
    categories: Category[],
    currUser: User,
    setLike: Function,
}

export default useEventCard;