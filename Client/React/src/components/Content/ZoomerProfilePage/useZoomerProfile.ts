import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import { convertEvent } from 'utils/EventsUtil/EventsUtil'

const useZoomerProfile = (): useZoomerProfileOutCome => {

    const user = useSelector<StoreStateType, User>(state => state.user);
    const [zoomer, setZoomer] = useState<User>();

    const getZoomerById = (id: string) => {
        axios.get(`/users/${id}`).then((result: any) => {
            setZoomer(result.data);
        }).catch((error: any) => (
            console.log(error)
        ));
    }

    return {
        zoomer,
        getZoomerById,
    }
}

interface useZoomerProfileOutCome {
    zoomer: User | undefined,
    getZoomerById: Function
}

export default useZoomerProfile;