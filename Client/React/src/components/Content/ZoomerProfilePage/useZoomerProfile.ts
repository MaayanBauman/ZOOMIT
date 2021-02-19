import { useState } from 'react';
import axios from 'utils/axios';
import User from 'models/User/User';

const useZoomerProfile = (): useZoomerProfileOutCome => {

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