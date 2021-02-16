import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import Event from 'models/Event/Event';
import useStyles from './EventCardStyles';
import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import useEventCard from './useEventCard';
import User from 'models/User/User';

const EventCard: React.FC<Props> = ({ event }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const { getUserById } = useEventCard();
    const [zoomerPic, setZoomerPic] = useState('');
    
    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    useEffect(() => {
        const getZoomer = async() => {
            const zoomer: User = await getUserById(event.zoomer_id);
            setZoomerPic(zoomer.photograph);
        };
        getZoomer();
    }, [event.zoomer_id, getUserById]);

    return (
        <div >
            <Card className={classes.root}>
                <CardContent className={classes.cardContentt}>
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        {event.title}
                    </Typography>
                    <div className={classes.zoomer}>
                        <img alt={'zoomer'} src={zoomerPic}></img>
                        <Typography variant="subtitle1">{event.description.length > 25 ? `${event.description.slice(0,25)}...`: event.description}</Typography>
                    </div>
                    <div className={classes.details}>
                        <Typography variant="body1">
                            {formatDate(event.start_time)}&emsp;{formatDayName(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {formatTime(event.end_time)}-{formatTime(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {event.price} &#8362;
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
    event: Event;
}

export default EventCard;
