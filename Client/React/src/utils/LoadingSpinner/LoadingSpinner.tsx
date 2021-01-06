import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop } from '@material-ui/core';

import useStyles from './LoadingSpinnerStyles';
import StoreStateType from 'redux/storeStateType';

const LoadingSpinner: React.FC = () => {

    const isLoading = useSelector<StoreStateType, boolean>(state => state.isLoading);
    const classes = useStyles();

    return (
      <Backdrop open={isLoading} className={classes.container}>
        <CircularProgress size='20vh' />
      </Backdrop>
    );
}

export default LoadingSpinner;
