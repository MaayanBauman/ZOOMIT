import { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import useRecommendedEvents from './useRecommendedEvents';
import EventsList from '../EventsList/EventsList';

const RecommendedEvents: React.FC = (): JSX.Element => {  
    const { user, recommendedEvents, getRecommendedUserEvents } = useRecommendedEvents();
    
    useEffect(() => {
        user._id !== '' && getRecommendedUserEvents(user._id);
    }, []);

    return (
        <div>
            <Typography>
                {
                    recommendedEvents.length ? 
                        (<EventsList events={recommendedEvents}/>)
                    : 
                        (<Typography>
                            אוי משהו השתמש תנסו שוב יותר מאוחר
                        </Typography>)
                }
            </Typography>
        </div>
    );
}

export default RecommendedEvents;
