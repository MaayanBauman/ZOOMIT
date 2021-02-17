import axios from 'utils/axios';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';

const useEventCard = () : useEventCardOutCome  => {
    const categories = useSelector<StoreStateType, Category[]>(state=> state.categories);

    const getSourceById = (sourceId: string) => {
        axios.get(`/sources/${sourceId}`).then((result : any) => {
            return(result.data);
         }).catch((error: any) => (
            console.log(error)
        ));
    }
    
    const getUserById = (userId: string) => {
        axios.get(`/users/${userId}`).then((result : any) => {
            return(result.data);
         }).catch((error: any) => (
            console.log(error)
        ));
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