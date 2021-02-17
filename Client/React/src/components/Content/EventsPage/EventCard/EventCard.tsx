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
    const [zoomer, setZoomer] = useState<User|undefined>();
    
    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    useEffect(() => {
        const zoomer: User = getUserById(event.zoomer_id);
        setZoomer(zoomer);
    }, [event.zoomer_id, getUserById]);

    return (
        <div >
            <Card className={classes.root}>
                <CardContent className={classes.cardContentt}>
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        {event.title}
                    </Typography>
                    <div className={classes.zoomer}>
                        <img alt={'zoomer'} src={zoomer && zoomer.photograph}></img>
                        <Typography variant="subtitle1">{zoomer && zoomer.full_name}</Typography>
                    </div>
                    <div className={classes.details}>
                        <Typography variant="body1">
                            {formatDate(event.start_time)}&emsp;{formatDayName(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {formatTime(event.end_time)}-{formatTime(event.start_time)}
                        </Typography>
                        <Typography variant="body1">
                            {event.price !== 0 ? `₪${event.price}` : '⭐חינם!⭐' }
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
