import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import Event, {FullEvent} from 'models/Event/Event';
import useStyles from './EventCardStyles';
import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import useEventCard from './useEventCard';
import { categoryNameById } from 'utils/CategoryUtil/CategoryUtil';
import { getFullEventsByCatgory } from 'utils/Event';

const EventCard: React.FC<Props> = ({ event, showZoomer, showCategory }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const { getUserById, getSourceById, categories } = useEventCard();
    const [authorPhoto, setAuthorPhoto] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    const handleZoomerClick = () => {
        history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
    }

    useEffect(() => {
        if(showZoomer) {
            const fullEvent = event as FullEvent
            if(event.zoomer_id) {
                setAuthorPhoto(fullEvent.zoomer_detailes.photograph);
                setAuthorName(fullEvent.zoomer_detailes.full_name);
            } else if(event.source_id){
                setAuthorPhoto(fullEvent.source_detailes.photograph);
                setAuthorName(fullEvent.source_detailes.name);
            }
        }
    }, [event.source_id, event.zoomer_id]);

    return (
        <div >
            <Card className={classes.root}>
                <CardContent className={classes.cardContentt}>
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        {event.title.length > 20 ? `${event.title.slice(0,20)}...`: event.title}
                    </Typography>
                    <div className={classes.zoomer}>
                        {showZoomer &&
                            <img alt={'Author'} src={authorPhoto} onClick={() => handleZoomerClick()} className={classes.clickable}></img>
                        }
                        <div>
                            {showZoomer && <Typography variant="subtitle1" onClick={() => handleZoomerClick()} className={classes.clickable}>{authorName}</Typography>}
                            {showCategory && <Typography variant="body1" className={classes.category}>{categoryNameById(categories, event.category)}</Typography>}
                        </div>
                    </div>
                    <div className={classes.details}>
                        <Typography variant="body1">
                            {formatDate(event.start_time)}&emsp;{formatDayName(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {formatTime(event.end_time)}-{formatTime(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {event.price !== 0 ? `₪${event.price}` : '⭐חינם!⭐'}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button variant="contained" color="primary" onClick={() => handleClickMoreDetails()}>עוד פרטים</Button>
                </CardActions>
            </Card>
        </div>
    );
}

interface Props {
    event: FullEvent | Event;
    showZoomer: boolean,
    showCategory: boolean,
}

export default EventCard;
