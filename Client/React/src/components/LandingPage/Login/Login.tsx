import classes from '*.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import useStyles from './LoginStyles';


const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  console.log((response as GoogleLoginResponse).getAuthResponse().access_token);

  
}

const Login : React.FC = (): JSX.Element => {
    const classes = useStyles();
    const clientId = process.env.REACT_APP_CLIENTID;

    return (
      <GoogleLogin 
        className = {classes.signInGoogle}
        clientId={clientId || ''}
        render={renderProps => (
          <Button variant="contained" color="primary" className={classes.signInGoogle} onClick={renderProps.onClick} disabled={renderProps.disabled}>
          התחברות עם חשבון גוגל
          </Button>
        )}
        buttonText="התחברות עם חשבון גוגל"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    )
};
    
export default Login;