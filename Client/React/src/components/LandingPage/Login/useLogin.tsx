import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import axios from 'utils/axios';
import {setUser} from 'redux/User/userActionCreator';
import {initialState} from 'redux/User/userReducer';
import {eventsPageRoute, contentRoute} from 'utils/Routes/Routes';

const useLogin = () : useEventPageOutCome  => {
    const history = useHistory();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenSignUpDialog = () => {
        setDialogOpen(true);
    };
    const handleCloseSignUpDialog = () => {
        setDialogOpen(false);
    };

    const handleLogin = (email: String) => {
        // check if the user exists
        axios.get(`users/email/${email}`)
        .then((result: any)=> {
            if(result.data.length === 0){
                handleOpenSignUpDialog();
            } 
            else {
                setUser(result.data[0]);
                history.push(contentRoute + eventsPageRoute);
            }
        })
        .catch((error)=> {
            console.log(error);
        })
    }

    const SuccessResponseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const profile = (response as GoogleLoginResponse)?.getBasicProfile();
        
        setUser({ 
            ...initialState,
            full_name: profile?.getName(),
            email: profile?.getEmail(),
            photograph: profile?.getImageUrl()
        });

        handleLogin(profile?.getEmail());
    }

    const FailiureResponseGoogle = (response: GoogleLoginResponseOffline) => {
        console.log(response);
    }

    return {
        SuccessResponseGoogle,
        FailiureResponseGoogle,
        handleOpenSignUpDialog,
        handleCloseSignUpDialog,
        dialogOpen
    }
}

interface useEventPageOutCome {
    SuccessResponseGoogle: (response: GoogleLoginResponse | GoogleLoginResponseOffline)=> void | undefined,
    FailiureResponseGoogle: (response: GoogleLoginResponseOffline)=> void | undefined,
    handleOpenSignUpDialog: () => void,
    handleCloseSignUpDialog: () => void,
    dialogOpen: boolean
}

export default useLogin;