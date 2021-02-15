import React, { useEffect } from 'react';
import { Button, Divider, Link, Typography } from '@material-ui/core';
import StoreStateType from 'redux/storeStateType';
import useEventRegistration from './useEventRegistration';
import useStyles from './EventRegistrationStyles';

const EventRegistration: React.FC<Props> = ({ eventId, userId, isRegistered, getEventById }: Props): JSX.Element => {

    const { registerToEvent, cancelEventRegistration } = useEventRegistration({getEventById});
    const classes = useStyles();

    return (
        <>
        {
            isRegistered ?
            <Button variant="contained" color="secondary" size="medium" onClick={(event) => cancelEventRegistration(userId, eventId)}>ביטול הרשמה</Button>
            :
            <Button variant="contained" color="primary" size="large" onClick={(event) => registerToEvent(userId, eventId)}>הרשמה!</Button>
        }
        </>
    );
}

interface Props {
    eventId: String | undefined,
    userId: String,
    isRegistered: boolean | undefined,
    getEventById: Function
}

export default EventRegistration;
