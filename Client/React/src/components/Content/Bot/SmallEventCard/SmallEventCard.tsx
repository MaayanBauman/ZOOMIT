import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import Event, { FullEvent } from 'models/Event/Event';
import useStyles from './SmallEventCardStyles';
import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import useSmallEventCard from './useSmallEventCard';
import { englishSites } from 'utils/EventsUtil/EventsUtil';

const SmallEventCard: React.FC<Props> = ({ event }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const { currUser, setUserRating } = useSmallEventCard();
    const [authorPhoto, setAuthorPhoto] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isZoomerActive, setIsZoomerActive] = useState(false);
    const [authorIsZoomer, setAuthorIsZoomer] = useState(false);

    const isPastEvent: boolean = event ? event.start_time < new Date() : true;
    const isEnglishText = englishSites.includes(authorName);
    const eventIndexInUserRegisteredList: number = currUser.registerd_events.findIndex(registerd_event => registerd_event.eventId === event.id);
    const userRating: number = eventIndexInUserRegisteredList !== -1 ? currUser.registerd_events[eventIndexInUserRegisteredList].rating : 0;

    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    const handleZoomerClick = () => {
        if (isZoomerActive && authorIsZoomer) {
            history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
        }
    }

    useEffect(() => {
        const fullEvent = event as FullEvent;

        if (event.zoomer_id) {
            setAuthorPhoto(fullEvent.zoomer_detailes.photograph);
            setAuthorName(fullEvent.zoomer_detailes.full_name);
            setIsZoomerActive(fullEvent.zoomer_detailes.zoomer_is_active);
            setAuthorIsZoomer(true);
        } else if (event.source_id) {
            setAuthorPhoto(fullEvent.source_detailes.photograph);
            setAuthorName(fullEvent.source_detailes.name);
            setIsZoomerActive(true);
            setAuthorIsZoomer(false);
        }
    }, [event, event.source_id, event.zoomer_id]);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContentt}>
                <div>
                    <div>
                        { isPastEvent && eventIndexInUserRegisteredList !== -1 && 
                            <Typography className={classes.ratingContainer}>
                                <Rating
                                    className={classes.rating}
                                    size="medium"
                                    value={userRating}
                                    onChange={(e, newUserRating) => {
                                        setUserRating(currUser._id, event.id, newUserRating);
                                    }}
                                />
                            </Typography>
                        }
                    </div>
                    <div className={classes.titleContainer}>
                        <div className={classes.zoomer}>
                            <div>
                                <img alt={'Author'} src={authorPhoto} onClick={() => handleZoomerClick()} className={`${(isZoomerActive && authorIsZoomer) ? classes.clickable : ''}`}></img>
                                {!isZoomerActive &&
                                    <Typography variant="subtitle1" className={classes.unactive}>לא פעיל</Typography>
                                }
                            </div>
                        </div>
                        <div>
                            <Typography className={`${classes.title} ${isEnglishText ? classes.english : ''}`} variant="subtitle1" gutterBottom onClick={() => handleClickMoreDetails()}>
                                {event.title}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <div className={classes.details}>
                                {formatDate(event.start_time)}{" "}
                                {formatDayName(event.start_time)}{" "}
                                {formatTime(event.end_time)}-{formatTime(event.start_time)}
                            <Typography variant="body1">
                                {event.price !== 0 ? `₪${event.price}` : '⭐חינם!⭐'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button variant="contained" color="primary" onClick={() => handleClickMoreDetails()}>עוד פרטים</Button>
            </CardActions>
        </Card>
    );
}

interface Props {
    event: FullEvent | Event;
}

export default SmallEventCard;
