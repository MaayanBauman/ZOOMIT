import Carousel from 'react-material-ui-carousel';

import Event from 'models/Event/Event';
import EventCard  from '../EventCard/EventCard';
import useStyles from './EventCategoryRowStyles';

export const EventsInRow = 6;

const EventCategotryRow: React.FC<Props> = ({events}: Props): JSX.Element => {
    const classes = useStyles();

    const chunks = (events: Event[], size: number) => {
        let results = [];
        while (events.length) {
          results.push(events.splice(0, size));
        }
        console.log(results)
        return results;
    };
    
    return (
        <div>
        <Carousel navButtonsAlwaysVisible={true} indicators={false} animation='slide' autoPlay={false}>
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
}

export default EventCategotryRow;
