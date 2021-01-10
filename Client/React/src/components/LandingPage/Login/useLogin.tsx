import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import axios from 'utils/axios';
import User from 'models/User/User';
import {setUser} from 'redux/User/userActionCreator';
import {initialState} from 'redux/User/userReducer';
import {eventsPageRoute, contentRoute} from 'utils/Routes/Routes';

const useLogin = () : useEventPageOutCome  => {
    const history = useHistory();
   
    const SuccessResponseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log((response as GoogleLoginResponse)?.getAuthResponse()?.access_token);
        const profile = (response as GoogleLoginResponse)?.getBasicProfile();

        setUser({ 
            ...initialState,
            full_name: profile?.getName(),
            email: profile?.getEmail(),
            photograph: profile?.getImageUrl()
        })

        history.push(contentRoute + eventsPageRoute);
    }

    const FailiureResponseGoogle = (response: GoogleLoginResponseOffline) => {
        console.log(response);
    }

    return {
        SuccessResponseGoogle,
        FailiureResponseGoogle
    }
}

interface useEventPageOutCome {
    SuccessResponseGoogle: (response: GoogleLoginResponse | GoogleLoginResponseOffline)=> void | undefined,
    FailiureResponseGoogle: (response: GoogleLoginResponseOffline)=> void | undefined
}

export default useLogin;