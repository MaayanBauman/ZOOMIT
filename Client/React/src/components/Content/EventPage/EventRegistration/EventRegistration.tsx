import React  from 'react';
import { Button } from '@material-ui/core';
import useEventRegistration from './useEventRegistration';

const EventRegistration: React.FC<Props> = ({ eventId, userId, isRegistered, getEventById }: Props): JSX.Element => {

    const { registerToEvent, cancelEventRegistration } = useEventRegistration({getEventById});

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
