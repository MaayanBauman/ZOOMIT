import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';

const useEventCard = (): useEventCardOutCome => {
    const categories = useSelector<StoreStateType, Category[]>(state => state.categories);

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
        categories,
        getSourceById,
    }
}

interface useEventCardOutCome {
    getUserById: Function,
    getSourceById: Function,
    categories: Category[],
}

export default useEventCard;