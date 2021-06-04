import { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import usePastEvents from './usePastEvents';
import EventsList from '../EventsList/EventsList';

const PastEvents: React.FC = (): JSX.Element => {  
    const { user, pastEvents, getPastUserEvents } = usePastEvents();
    
    useEffect(() => {
        user._id !== '' && getPastUserEvents(user._id);
    }, []);

    return (
        <div>
            <Typography>
                {
                    pastEvents.length ? 
                        (<EventsList events={pastEvents}/>)
                    : 
                        (<Typography>
                            דירגת כבר את כל האירועים! יאללה כדאי לחפש חדשים
                        </Typography>)
                }
            </Typography>
        </div>
    );
}

export default PastEvents;
