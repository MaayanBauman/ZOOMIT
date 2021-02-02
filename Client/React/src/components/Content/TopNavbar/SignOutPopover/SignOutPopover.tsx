import React from 'react';
import {useHistory} from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import{ Popover } from '@material-ui/core';

import {setUser} from 'redux/User/userActionCreator';
import {initialState} from 'redux/User/userReducer';
import {landingPageRoute} from 'utils/Routes/Routes';

const SignOutPopover: React.FC<Props> = ({anchorEl, isOpen, setIsOpen}): JSX.Element => {
   
    const history = useHistory();
    const logoutFromGoogle = () => {
        setUser(initialState);
        history.push(landingPageRoute);
    }

    return (
      <Popover
        open={isOpen}
        onClose={() => {setIsOpen(false)}}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <GoogleLogout
            clientId={process.env.REACT_APP_CLIENTID as string}
            buttonText="Logout"
            onLogoutSuccess={logoutFromGoogle}
            >
        </GoogleLogout>
      </Popover>
    );
}

export interface Props {
    anchorEl: HTMLButtonElement | null;
    isOpen : boolean;
    setIsOpen: Function
};
export default SignOutPopover;
