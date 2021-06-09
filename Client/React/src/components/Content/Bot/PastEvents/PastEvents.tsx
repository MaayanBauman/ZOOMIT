import { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import usePastEvents from './usePastEvents';
import EventsList from '../EventsList/EventsList';
import BotSpinner from '../BotSpinner/BotSpinner';

const PastEvents: React.FC<Props> = (props: Props): JSX.Element => {  
    let triggerCall: boolean = false;  
    const { user, pastEvents, getPastUserEvents, isLoading } = usePastEvents();
    
    useEffect(() => {
        user._id !== '' && getPastUserEvents(user._id);
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
                        pastEvents.length ? 
                            (<EventsList events={pastEvents}/>)
                        : 
                            (<Typography>
                                דירגת כבר את כל האירועים! יאללה כדאי לחפש חדשים
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

export default PastEvents;
