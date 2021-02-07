import React from 'react';
import {useSelector} from 'react-redux'
import { Typography, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';

import useStyles from './ZoomerEventsStyles'; 

const ZoomerEvent: React.FC = (): JSX.Element => {

    const classes = useStyles();
    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    
    return (
        <>
           {(zoomer.owned_events.length === 0) ? 
           <div className={classes.backgroundImage}>
               <Typography className={classes.crowdTitle}>הקהל כבר מחכה לך!</Typography>
               <IconButton ><AddCircleIcon className={classes.addEventButton}></AddCircleIcon></IconButton>
           </div> : 
           <div>יש אירועים</div>}
        </>
    );
}

export default ZoomerEvent;
