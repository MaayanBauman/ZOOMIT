import React, { useEffect } from 'react';
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
import { contentRoute } from 'utils/Routes/Routes';
import { englishSites } from 'utils/EventsUtil/EventsUtil';
import Category from 'models/Category/Category';
import {categoryNameById} from 'utils/CategoryUtil/CategoryUtil';

const EventPage: React.FC = (): JSX.Element => {

    const history = useHistory();
    const { event, getEventById, isRegistered, authorDetails, authorIsZoomer } = useEventPage();
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const user = useSelector<StoreStateType, User>(state => state.user);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);
    const isPastEvent: boolean = event ? event.start_time < new Date() : true;
    const isEnglishText = authorDetails ? englishSites.includes(authorDetails.name) : false;
    const categories = useSelector<StoreStateType, Category[]>(state => state.categories);
    
    const handleLogoutMouseOver = (event: any) => {
        setIsPopoverOpen(true);
        setAnchorEl(event.currentTarget);
    };

    const handleZoomerClick = () => {
        if (authorDetails?.zoomer_is_active && authorIsZoomer) {
            history.push(`${contentRoute}/zoomerprofile/${event?.zoomer_id}`);
        }
    }

    useEffect(() => {
        getEventById(id);
    }, [])

    return (
        <>
            <div className={classes.container}>
                <div className={classes.headLine}>
                    <img alt={'zoomer'} src={authorDetails?.photograph} onClick={() => handleZoomerClick()} className={`${(authorDetails?.zoomer_is_active && authorIsZoomer) ? classes.clickable : ''}`}></img>
                    {!authorDetails?.zoomer_is_active &&
                        <Typography variant="subtitle1" className={classes.unactive}>לא פעיל</Typography>
                    }
                    <div className={classes.headDetails}>
                        <Typography variant="subtitle1" className={`${classes.eventName} ${isEnglishText ? classes.english : ''}`}>
                            { !!isPastEvent &&
                                <Typography variant="subtitle1" className={classes.pastEvent}>האירוע עבר</Typography>
                            }
                            {event?.title}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.zoomerWith}>עם</Typography>
                        <Typography variant="caption" className={`${classes.zoomer} ${(authorDetails?.zoomer_is_active && authorIsZoomer) ? classes.clickable : ''} ${isEnglishText ? classes.english : ''}`} onClick={() => handleZoomerClick()}>{authorDetails?.name}</Typography>
                        {event?.category &&
                        <> 
                            <Typography variant="subtitle1" className={classes.zoomerWith}>קטגוריה</Typography>
                        <Typography variant="caption" className={classes.zoomer}>{categoryNameById(categories, event ? event.category : "" )}  </Typography> </>}
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
                    <div className={`${classes.descContainer} ${isEnglishText ? classes.english : ''}`}>
                        <Typography variant="body1">
                            {event?.description}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.registerLine}>
                <div className={classes.registerAction}>
                    <EventRegistration eventId={event?.id} userId={user._id} isRegistered={isRegistered} getEventById={getEventById} isPastEvent={isPastEvent}></EventRegistration>
                    <Typography variant="subtitle1" gutterBottom>
                        {
                            (event?.registered_users.length === 0) ?
                                'היו הראשונים להירשם!'
                                : (event?.registered_users.length === 1) ?
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
