import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import Category from 'models/Category/Category';
import StoreStateType from 'redux/storeStateType';
import Source from 'models/Source/Source';

const useEventCard = () : useEventCardOutCome  => {
    const [users, setUsers] = useState<User[]|[]>([]);
    const [sources, setSources] = useState<Source[]|[]>([]);
    const categories = useSelector<StoreStateType, Category[]>(state=> state.categories);

    const getUsers = () => {
        axios.get('/users').then((result : any) => {
            setUsers(result.data);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }
    const getSources = () => {
        axios.get('/sources').then((result : any) => {
            setSources(result.data);
         }).catch((error: any)=> (
            console.log(error)
        ));
    }

    const getSourceById = (sourceId: string) => {
        const source = sources.find(source => source._id === sourceId )
        return source;
    }
    
    const getUserById = (userId: string) => {
        const user = users.find(user => user._id === userId )
        return user;
    }
    
    useEffect(() => {
        getUsers();
        getSources();
    }, []);

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