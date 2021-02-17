import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import User from 'models/User/User';

const useEventCard = () : useEventCardOutCome  => {
    const [users, setUsers] = useState<User[]|[]>([]);

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
    }
}

interface useEventCardOutCome {
    getUserById: Function,
}

export default useEventCard;