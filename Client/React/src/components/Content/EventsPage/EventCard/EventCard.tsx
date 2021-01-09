import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';

import Event from 'models/Event/Event';
import useStyles from './EventCardStyles';
import userpic from 'assets/images/userpic.jpg'; /* for now couse i dont have a zoomer */

const EventCard: React.FC<Props> = ({ event }: Props): JSX.Element => {
    const classes = useStyles();

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
                            {event.start_time.toLocaleDateString('he-IL', { 'day': '2-digit', 'month': '2-digit', 'year': 'numeric' })}&emsp;{event.start_time.toLocaleDateString('he-IL', { 'weekday': 'long' })}
                        </Typography>
                        <Typography variant="body1">
                            {event.end_time.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')}-{event.start_time.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')}
                        </Typography>
                        <Typography variant="body1">
                            {event.price} &#8362;
                    </Typography>
                    </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button variant="contained" color="secondary">עוד פרטים</Button>
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
