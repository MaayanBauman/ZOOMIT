import { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import useRecommendedEvents from './useRecommendedEvents';
import EventsList from '../EventsList/EventsList';
import BotSpinner from '../BotSpinner/BotSpinner';

const RecommendedEvents: React.FC<Props> = (props: Props): JSX.Element => {
    let triggerCall: boolean = false;  
    const { user, recommendedEvents, getRecommendedUserEvents, isLoading } = useRecommendedEvents();
    
    useEffect(() => {
        user._id !== '' && getRecommendedUserEvents(user._id);
    }, []);
        
    useEffect(() => {
        if (!triggerCall && !isLoading) {
            props.triggerNextStep({trigger: 1});
            triggerCall = true;
        }
    }, [isLoading]);

    return (
        <div>
            <Typography>
                {
                    isLoading ? 
                        ''
                    :
                        recommendedEvents.length ? 
                            (<EventsList events={recommendedEvents}/>)
                        : 
                            (<Typography>
                                אוי משהו השתמש תנסו שוב יותר מאוחר
                            </Typography>)
                }
            </Typography>
            <BotSpinner isLoading={isLoading}/>
        </div>
    );
}

interface Props {
    triggerNextStep: Function;
}

export default RecommendedEvents;
