import { Typography, Card, CardContent, CardActions, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import Event, { FullEvent } from 'models/Event/Event';
import useStyles from './EventCardStyles';
import { contentRoute } from 'utils/Routes/Routes';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import useEventCard from './useEventCard';
import { categoryNameById } from 'utils/CategoryUtil/CategoryUtil';

const EventCard: React.FC<Props> = ({ event, showZoomer, showCategory }: Props): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const { categories, currUser } = useEventCard();
    const [authorPhoto, setAuthorPhoto] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isZoomerActive, setIsZoomerActive] = useState(false);
    const [authorIsZoomer, setAuthorIsZoomer] = useState(false);
    const isPastEvent: boolean = event ? event.start_time < new Date() : true;

    const handleClickMoreDetails = () => {
        history.push(`${contentRoute}/event/${event.id}`);
    }

    const handleZoomerClick = () => {
        if (isZoomerActive && authorIsZoomer) {
            history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
        }
    }

    useEffect(() => {
        if (showZoomer) {
            const fullEvent = event as FullEvent
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
        }
    }, [event, event.source_id, event.zoomer_id, showZoomer]);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContentt}>
                <Typography className={classes.title} variant="subtitle1" gutterBottom onClick={() => handleClickMoreDetails()}>
                    {isPastEvent &&
                        <Typography variant="subtitle1" className={classes.pastEvent}>האירוע עבר</Typography>
                    }
                    {event.title}
                </Typography>
                <div className={classes.zoomer}>
                    {showZoomer &&
                        <div>
                            <img alt={'Author'} src={authorPhoto} onClick={() => handleZoomerClick()} className={`${(isZoomerActive && authorIsZoomer) ? classes.clickable : ''}`}></img>
                            {!isZoomerActive &&
                                <Typography variant="subtitle1" className={classes.unactive}>לא פעיל</Typography>
                            }
                        </div>
                    }
                    <div>
                        {showZoomer &&
                            <Typography variant="subtitle1" onClick={() => handleZoomerClick()} className={`${(isZoomerActive && authorIsZoomer) ? classes.clickable : ''}`}>{authorName}</Typography>}
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
                {/* { isPastEvent && currUser.registerd_events.includes(event.id) && 
                    <FormControlLabel 
                         className={"classes.likeBtn"}
                         onChange={(e) => setLike(e)}
                         control={<Checkbox value={event.id} checked={ currUser.liked_events?.includes(event.id) } icon={<ThumbUpOutlinedIcon color='action' />} checkedIcon={<ThumbUpIcon color='primary'/>} />}
                         label=""
                    />
                 } */}
                 
                <Button variant="contained" color="primary" onClick={() => handleClickMoreDetails()}>עוד פרטים</Button>
            </CardActions>
        </Card>
    );
}

interface Props {
    event: FullEvent | Event;
    showZoomer: boolean,
    showCategory: boolean,
}

export default EventCard;
