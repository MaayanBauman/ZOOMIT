import React, { useEffect } from 'react';
import { Button, Divider, Link } from '@material-ui/core';
import StoreStateType from 'redux/storeStateType';
import useEventRegistration from './useEventRegistration';
import useStyles from './EventRegistrationStyles';

const EventRegistration: React.FC<Props> = ({eventId, userId}: Props): JSX.Element => {

    const { registerToEvent } = useEventRegistration();
    const classes = useStyles();

    return (
        <>
            <Button variant="contained" color="primary" size="large" onClick={(event) => registerToEvent(userId, eventId)}>הרשמה!</Button>
        </>
    );
}

interface Props {
    eventId: String | undefined,
    userId: String,
}

export default EventRegistration;
