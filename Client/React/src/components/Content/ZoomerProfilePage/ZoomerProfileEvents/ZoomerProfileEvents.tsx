import React from 'react';
import { Typography } from '@material-ui/core';

import useStyles from './ZoomerProfileEventsStyles';
import FilterBox from 'components/Content/EventsPage/FilterBox/FilterBox';
import useZoomerProfileEvents from './useZoomerProfileEvents';
import EventCard from 'components/Content/EventsPage/EventCard/EventCard';
import Event from 'models/Event/Event';
import User from 'models/User/User';


const ZoomerEvents: React.FC<Props> = ({ zoomer }: Props): JSX.Element => {

    const classes = useStyles();
    const { zoomerEvents, getEventByFilters } = useZoomerProfileEvents({ zoomer });

    return (
        <>
            {(zoomer?.owned_events.length === 0) ?
                <Typography className={classes.crowdTitle}>לזומר הזה עדיין לא פרסם זומים</Typography>
                :
                <div>
                    <div className={classes.searchArea}>
                        <Typography>{`${zoomerEvents.length} זומים`}</Typography>
                        <div className={classes.filter}>
                            <FilterBox onFilter={getEventByFilters} zoomerIdEvents={zoomer?._id} />
                        </div>
                    </div>
                    <div className={classes.eventsContainer}>
                        {zoomerEvents?.map((event: Event) => (<EventCard event={event} showZoomer={false} showCategory={true}> </EventCard>))}
                    </div>
                </div>
            }
        </>
    );
}

interface Props {
    zoomer: User | undefined;
}

export default ZoomerEvents;
