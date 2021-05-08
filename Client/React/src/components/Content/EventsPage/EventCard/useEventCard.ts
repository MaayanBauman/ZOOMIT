import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import User from 'models/User/User';

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

    return {
        getUserById,
        getSourceById,
        categories,
        currUser,
    }
}

interface useEventCardOutCome {
    getUserById: Function,
    getSourceById: Function,
    categories: Category[],
    currUser: User,
}

export default useEventCard;