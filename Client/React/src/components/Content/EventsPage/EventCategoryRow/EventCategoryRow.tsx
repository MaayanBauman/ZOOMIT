import { Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import {FullEvent} from 'models/Event/Event';
import useEventCategoryRow from './useEventCategoryRow';
import EventsCarousel from './EventsCarousel';
import useStyles from './EventCategoryRowStyles';
export const EventsInRow = 6;

const EventCategotryRow: React.FC<Props> = ({ events, title, categoryId, isFavorite }: Props): JSX.Element => {
    const { addFavoriteHandler, removeFavoriteHandler } = useEventCategoryRow();

    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <Typography className={classes.title}>
                {title} 
                {isFavorite ? <Favorite onClick={() => removeFavoriteHandler(categoryId) } color='secondary' /> : <FavoriteBorder onClick={() => addFavoriteHandler(categoryId) } color='action'/>}
            </Typography> 
            <EventsCarousel events={events}/>
        </div>
    );
}
interface Props {
    events: FullEvent[];
    title: string;
    isFavorite: Boolean;
    categoryId: string;
}

export default EventCategotryRow;
