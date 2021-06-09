import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop } from '@material-ui/core';

import useStyles from './BotSpinnerStyles';
import StoreStateType from 'redux/storeStateType';

const BotSpinner: React.FC<Props> = ({ isLoading }: Props) => {
    // const isLoading = useSelector<StoreStateType, boolean>(state => state.isLoading);
    const classes = useStyles();

    return (
      <Backdrop open={isLoading} className={classes.container}>
        <CircularProgress size='15vh' />
      </Backdrop>
    );
}

interface Props {
    isLoading: boolean;
}

export default BotSpinner;
