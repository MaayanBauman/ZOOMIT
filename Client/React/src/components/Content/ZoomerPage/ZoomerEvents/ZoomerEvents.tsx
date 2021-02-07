import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import { Typography, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';

import useStyles from './ZoomerEventsStyles'; 
import EventEditorDialog from './EventEditorDialog/EventEditorDialog';

const ZoomerEvent: React.FC = (): JSX.Element => {

    const classes = useStyles();
    const zoomer = useSelector<StoreStateType, User>(state => state.user);
    const [isEventEditorOpen, setIsEventEditorOpen] = useState<boolean>(false);

    return (
        <>
           {(zoomer.owned_events.length === 0) ? 
           <div className={classes.backgroundImage}>
               <Typography className={classes.crowdTitle}>הקהל כבר מחכה לך!</Typography>
               <IconButton onClick={() => setIsEventEditorOpen(true)}><AddCircleIcon className={classes.addEventButton}></AddCircleIcon></IconButton>
               <EventEditorDialog isEditMode={false} isOpen={isEventEditorOpen} handleClose={()=> setIsEventEditorOpen(false)}/>
           </div> : 
           <div>יש אירועים</div>}
        </>
    );
}

export default ZoomerEvent;
