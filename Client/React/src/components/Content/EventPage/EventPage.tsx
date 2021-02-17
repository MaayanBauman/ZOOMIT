import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import useEventPage from './useEventPage';
import useStyles from './EventPageStyles';
import { useHistory, useParams } from 'react-router-dom';
import { Divider, Link } from '@material-ui/core';
import formatDate, { formatDayName, formatTime } from 'utils/DatesUtil/DatesUtil';
import { useSelector } from 'react-redux';
import User from 'models/User/User';
import StoreStateType from 'redux/storeStateType';
import EventRegistration from './EventRegistration/EventRegistration';
import SignOutPopover from '../TopNavbar/SignOutPopover/SignOutPopover';
import useEventCard from '../EventsPage/EventCard/useEventCard';
import { contentRoute } from 'utils/Routes/Routes';

const EventPage: React.FC = (): JSX.Element => {

    const history = useHistory();
    const { event, getEventById, isRegistered } = useEventPage();
    const classes = useStyles();
    const { getUserById } = useEventCard();
    const { id } = useParams<{ id: string }>();
    const [zoomer, setZoomer] = useState<User | undefined>();
    const user = useSelector<StoreStateType, User>(state => state.user);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

    const handleLogoutMouseOver = (event: any) => {
        setIsPopoverOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleZoomerClick = () => {
        history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
    }

    useEffect(() => {
        const zoomer: User = getUserById(event?.zoomer_id);
        setZoomer(zoomer);
    }, [event, getUserById]);

    useEffect(() => {
        getEventById(id);
    }, [])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.headLine}>
                    <img alt={'zoomer'} src={zoomer && zoomer.photograph} onClick={() => handleZoomerClick()}></img>
                    <div className={classes.headDetails}>
                        <Typography variant="subtitle1" className={classes.eventName}>
                            {event?.title}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.zoomerWith}>עם</Typography>
                        <Typography variant="caption" className={classes.zoomer} onClick={() => handleZoomerClick()}>{zoomer && zoomer.full_name}</Typography>
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
                            {event?.price !== 0 ? `₪${event?.price}` : '⭐חינם!⭐'}
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
                        לא המייל הנכון? <Link href="#" onClick={(event: any) => handleLogoutMouseOver(event)} variant="body2">לחצו כאן להחלפת חשבון!</Link>
                        <SignOutPopover anchorEl={anchorEl} isOpen={isPopoverOpen} setIsOpen={setIsPopoverOpen} />
                    </Typography>
                </div>
            </div>
        </>
    );
}

export default EventPage;
