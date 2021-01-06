import React, {  useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

import Event from 'models/Event/Event';
import EventCard  from './EventCard/EventCard';
import useEventPage from './useEventPage';

const EventsPage: React.FC = (): JSX.Element => {

    const {events} = useEventPage();

    useEffect((()=>{

    }), [events]);

    return (
        <div >
            <Typography>
              אירועים
            </Typography>
            {/* <Carousel navButtonsAlwaysVisible={true} indicators={false}>
                <div>
                    { events?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
                </div>
                <div>
                    { events?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
                </div>
            </Carousel> */}
              { events?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
        </div>
    );
}

export default EventsPage;
