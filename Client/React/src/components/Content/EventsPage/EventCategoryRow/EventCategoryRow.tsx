import { Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import EventCard  from '../EventCard/EventCard';
import useStyles from './EventCategoryRowStyles';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import Event from 'models/Event/Event';
import useEventCategoryRow from './useEventCategoryRow';
export const EventsInRow = 6;

const EventCategotryRow: React.FC<Props> = ({ events, title, categoryId, isFavorite }: Props): JSX.Element => {
    const { addFavoriteHandler, removeFavoriteHandler } = useEventCategoryRow();

    const classes = useStyles();

    const chunks = (events: Event[], size: number) => {
        let results = [];
        let eventsData= [...(events || [])];
        while (eventsData.length) {
          results.push(eventsData.splice(0, size));
        }
        console.log(results);
        return results;
    };
    
    return (
        <div className={classes.container}>
        <Typography className={classes.title}>
            {title} 
            {isFavorite ? <Favorite onClick={() => removeFavoriteHandler(categoryId) } /> : <FavoriteBorder onClick={() => addFavoriteHandler(categoryId) }/>}
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
    isFavorite: Boolean;
    categoryId: string;
}

export default EventCategotryRow;
