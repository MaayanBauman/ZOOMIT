import Carousel from 'react-material-ui-carousel';
import EventCard  from '../EventCard/EventCard';
import useStyles from './EventCategoryRowStyles';
import Event from 'models/Event/Event';

export const EventsInRow = 6;

const EventsCarousel: React.FC<Props> = ({ events }: Props): JSX.Element => {
    const classes = useStyles();

    const chunks = (events: Event[], size: number) => {
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
                            { eventArray?.map((event: Event) => (<EventCard event={event}> </EventCard>))}
                        </div>  
                    )
                })
            }
        </Carousel> 
    );
}
interface Props {
    events: Event[];
}

export default EventsCarousel;
