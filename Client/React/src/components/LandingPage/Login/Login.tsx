import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

import useStyles from './LoginStyles';
import useLogin from './useLogin';

const Login : React.FC = (): JSX.Element => {
    const classes = useStyles();
    const clientId = process.env.REACT_APP_CLIENTID;

    const { SuccessResponseGoogle, FailiureResponseGoogle } = useLogin();

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
        onSuccess={SuccessResponseGoogle}
        onFailure={FailiureResponseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    )
};
    
export default Login;