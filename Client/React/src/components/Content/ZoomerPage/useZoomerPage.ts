import {useSelector} from 'react-redux';
import { useState, useEffect, ChangeEvent } from 'react';

import axios from 'utils/axios';
import User from 'models/User/User'; 
import StoreStateType from 'redux/storeStateType';
import {setUser}  from 'redux/User/userActionCreator';

const useZoomerPage  = () : useZoomerPageOutCome  => {

    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    
    const updateZoomer = () => {
        axios.put(`/users/${zoomer._id}`, { user: zoomer })
        .then((result : any) => {
           //
        })
        .catch((error: any)=> (
            console.log(error)
        ))
    }

    const handleDescriptonChange = (event : any) => {
        const updatedDesc = event.target.value;
        setUser({...zoomer, description: updatedDesc});
    }

    return {
        handleDescriptonChange,
        updateZoomer
    }
}

interface useZoomerPageOutCome {
    handleDescriptonChange : Function,
    updateZoomer : Function
}


export default useZoomerPage;