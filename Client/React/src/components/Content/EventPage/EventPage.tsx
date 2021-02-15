import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventPageStyles';
import { useParams } from 'react-router-dom';
import userpic from 'assets/images/userpic.jpg'; /* for now couse i dont have a zoomer */
import { Button, Divider, Link } from '@material-ui/core';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import { useSelector } from 'react-redux';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import EventRegistration from './EventRegistration/EventRegistration';

const EventPage: React.FC = (): JSX.Element => {

    const { event, getEventById, isRegistered } = useEventPage();
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();

    const user = useSelector<StoreStateType, User>(state => state.user);

    useEffect(() => {
        getEventById(id);
    }, [])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.headLine}>
                    <img src={userpic}></img>
                    <div className={classes.headDetails}>
                        <Typography variant="subtitle1" className={classes.eventName}>
                            {event?.title}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.zoomerWith}>עם</Typography>
                        <Typography variant="caption" className={classes.zoomer}>
                            זהר עוזיאלי{/* {event?.title} */}
                        </Typography>
                    </div>
                </div>
                <div className={classes.detailsLine}>
                    <div className={classes.detailsContainer}>
                        <Typography variant="subtitle1">
                            {formatDate(event?.start_time)}&emsp;{formatDayName(event?.start_time)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {formatTime(event?.end_time)}-{formatTime(event?.start_time)}
                        </Typography>
                        <Typography variant="subtitle1">
                            {event?.price} &#8362;
                        </Typography>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.descContainer}>
                        <Typography variant="body1">
                            {event?.description}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.registerLine}>
                <div className={classes.registerAction}>
                    <EventRegistration eventId={event?.id} userId={user._id} isRegistered={isRegistered} getEventById={getEventById}></EventRegistration>
                    <Typography variant="subtitle1" gutterBottom>
                        {
                            (event?.registered_users.length == 0) ?
                                'היו הראשונים להירשם!'
                                : (event?.registered_users.length == 1) ?
                                    'נרשם כבר משתמש אחד'
                                    : `נרשמו כבר ${event?.registered_users.length} משתמשים!`
                        }
                    </Typography>
                </div>
                <div className={classes.registerDesc}>
                    <Typography variant="subtitle1">
                        אנחנו כבר מתרגשים!
                        </Typography>
                    <Typography variant="body1">
                        אחרי ההרשמה יתקבל למייל שלך ({user.email}) לינק לזום או לאתר של הזומר לקניית כרטיס לאירוע.
                    </Typography>
                    <Typography variant="body1">
                        לא המייל הנכון? <Link href="#" onClick={() => { }} variant="body2">לחצו כאן להחלפת חשבון!</Link>
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default EventPage;
