import { useState } from 'react';
import { Typography } from '@material-ui/core';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Carousel from 'react-material-ui-carousel';

import Event from 'models/Event/Event';
import EventCard  from '../EventCard/EventCard';
import useStyles from './EventCategoryRowStyles';

export const EventsInRow = 6;

const EventCategotryRow: React.FC<Props> = ({events, title}: Props): JSX.Element => {
    const classes = useStyles();
    const [like, setLike] = useState(false);

    const chunks = (events: Event[], size: number) => {
        let results = [];
        let eventsData= [...events];
        while (eventsData.length) {
          results.push(eventsData.splice(0, size));
        }
        console.log(results)
        return results;
    };
    
    return (
        <div className={classes.container}>
        <Typography className={classes.title}>
            {like ? <StarIcon onClick={() => setLike(false) } /> : <StarBorderIcon onClick={() => setLike(true) }/>}
            {title} 
        </Typography> 
        <Carousel navButtonsAlwaysVisible={true} indicators={true} animation='slide' autoPlay={false}>
            {
                chunks(events, EventsInRow).map((eventArray)=>{
                    return (
                        <div className={classes.eventRow}>
                            { eventArray?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
                        </div>  
                    )
                })
            }
        </Carousel> 
        </div>
    );
}
interface Props {
    events: Event[];
    title: string;
}

export default EventCategotryRow;
