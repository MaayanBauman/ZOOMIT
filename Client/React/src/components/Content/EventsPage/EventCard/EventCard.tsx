import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

import Event from 'models/Event/Event';
import useStyles from './EventCardStyles';
import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import useEventCard from './useEventCard';
import User from 'models/User/User';
import Category from 'models/Category/Category';
import { categoryNameById } from 'utils/CategoryUtil/CategoryUtil';

const EventCard: React.FC<Props> = ({ event, showZoomer, showCategory }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const { getUserById, categories } = useEventCard();
    const [zoomer, setZoomer] = useState<User | undefined>();

    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    const handleZoomerClick = () => {
        history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
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
                        {showZoomer &&
                            <img alt={'zoomer'} src={zoomer && zoomer.photograph} onClick={() => handleZoomerClick()} className={classes.clickable}></img>
                        }
                        <div>
                            {showZoomer && <Typography variant="subtitle1" onClick={() => handleZoomerClick()} className={classes.clickable}>{zoomer && zoomer.full_name}</Typography>}
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
    event: Event;
    showZoomer: boolean,
    showCategory: boolean,
}

export default EventCard;
