import Carousel from 'react-material-ui-carousel';

import Event, {FullEvent} from 'models/Event/Event';

import EventCard  from '../EventCard/EventCard';
import useStyles from './EventCategoryRowStyles';

export const EventsInRow = 6;

const EventsCarousel: React.FC<Props> = ({ events }: Props): JSX.Element => {
    const classes = useStyles();

    const chunks = (events: FullEvent[], size: number) => {
        let results = [];
        let eventsData= [...(events || [])];
        while (eventsData.length) {
          results.push(eventsData.splice(0, size));
        }
        return results;
    };
    
    return (
        <Carousel navButtonsAlwaysVisible={true} indicators={true} animation='slide' autoPlay={false}>
            {
                chunks(events, EventsInRow).map((eventArray)=>{
                    return (
                        <div className={classes.eventRow}>
                            { eventArray?.map((event: FullEvent) => (<EventCard event={event} showZoomer={true} showCategory={false}> </EventCard>))}
                        </div>  
                    )
                })
            }
        </Carousel> 
    );
}
interface Props {
    events: FullEvent[];
}

export default EventsCarousel;
