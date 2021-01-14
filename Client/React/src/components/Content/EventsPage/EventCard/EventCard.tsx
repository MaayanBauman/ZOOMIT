import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import Event from 'models/Event/Event';
import useStyles from './EventCardStyles';
import userpic from 'assets/images/userpic.jpg'; /* for now couse i dont have a zoomer */

import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';

const EventCard: React.FC<Props> = ({ event }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();

    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    return (
        <div >
            <Card className={classes.root}>
                <CardContent className={classes.cardContentt}>
                    <Typography className={classes.title} variant="subtitle1" gutterBottom>
                        {event.title}
                    </Typography>
                    <div className={classes.zoomer}>
                        <img src={userpic}></img>
                        <Typography variant="subtitle1">{event.description}</Typography>
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
                    <Button variant="contained" color="secondary" onClick={() => handleClickMoreDetails()}>עוד פרטים</Button>
                    <Button variant="contained" color="primary">הרשמה!</Button>
                </CardActions>
            </Card>
        </div>
    );
}

interface Props {
    event: Event;
}

export default EventCard;
