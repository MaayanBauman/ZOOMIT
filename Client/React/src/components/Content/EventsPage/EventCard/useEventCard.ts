import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';

const useEventCard = () : useEventCardOutCome  => {
    const [users, setUsers] = useState<User[]|[]>([]);
    const categories = useSelector<StoreStateType,Category[]>(state=> state.categories);

    const getUsers = () => {
        axios.get('/users').then((result : any) => {
            setUsers(result.data);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    const getUserById = (userId: string) => {
        const user = users.find(user => user._id === userId )
        return user;
    }
    useEffect(() => {
        getUsers();
    }, []);

    return {
        getUserById,
        categories
    }
}

interface useEventCardOutCome {
    getUserById: Function,
    categories: Category[],
}

export default useEventCard;