import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventPageStyles';
import Event from 'models/Event/Event';
import { useParams } from 'react-router-dom';

const EventPage: React.FC = (): JSX.Element => {

    const { event, getEventById } = useEventPage();

    const classes = useStyles();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getEventById(id);
    }, [])

    return (
        <>
            <div className={classes.container}>
                <Typography className={classes.count} variant="subtitle1" gutterBottom>
                    אירוע זום כלשהו
                        {event?.title}
                </Typography>
            </div>
        </>

    );
}

export default EventPage;
