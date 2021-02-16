import theme from 'assets/styles/theme';
import User from 'models/User/User';
import { useSelector } from 'react-redux';
import StoreStateType from 'redux/storeStateType';
import { setUser } from 'redux/User/userActionCreator';
import Swal from 'sweetalert2';
import axios from 'utils/axios';
import useStyles from './EventRegistrationStyles';

const useEventRegistration = ({ getEventById }: Props): useEventRegistrationOutCome => {
    const user = useSelector<StoreStateType, User>(state => state.user);

    const classes = useStyles();

    const registerToEvent = (userId: string, eventId: string) => {
        if (userId && userId !== "" && eventId && eventId !== "") {
            axios.put(`/users/${userId}/events/${eventId}`, {})
                .then(() => {
                    Swal.fire({
                        title: 'איזה כיף שנרשמת!',
                        text: 'בקרוב נשלח אליך מייל עם כל הפרטים שצריך',
                        icon: 'success',
                        confirmButtonText: 'אחלה, תודה!',
                        confirmButtonColor: theme.palette.primary.main,
                        customClass: {
                            title: classes.swal,
                            content: classes.swal,
                            container: classes.swal,
                            confirmButton: classes.swal,
                        },
                    }).then(() => {
                        const newRegisteredEvents = [...user.registerd_events, eventId];
                        setUser({ ...user, registerd_events: newRegisteredEvents });
                        getEventById(eventId)
                    })
                })
                .catch((error: any) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'יש לנו תקלה',
                        text: 'מצטערים אבל משהו לא עבד, שווה לנסות בקרוב שוב',
                        confirmButtonText: 'בסדר',
                        confirmButtonColor: theme.palette.primary.main,
                        customClass: {
                            title: classes.swal,
                            content: classes.swal,
                            container: classes.swal,
                            confirmButton: classes.swal,
                        },
                    })
                })
        }
    }

    const cancelEventRegistration = (userId: string, eventId: string) => {
        if (userId && userId !== "" && eventId && eventId !== "") {
            axios.delete(`/users/${userId}/events/${eventId}`)
                .then(() => {
                    Swal.fire({
                        title: 'ההרשמה בוטלה',
                        text: 'לא נורא, בטח יש זומים אחרים לראות :)',
                        icon: 'success',
                        confirmButtonText: 'תודה',
                        confirmButtonColor: theme.palette.primary.main,
                        customClass: {
                            title: classes.swal,
                            content: classes.swal,
                            container: classes.swal,
                            confirmButton: classes.swal,
                        },
                    }).then(() => {
                        const newRegisteredEvents = user.registerd_events.filter((id) => id !== eventId);
                        setUser({ ...user, registerd_events: newRegisteredEvents });
                        getEventById(eventId)
                    })
                })
                .catch((error: any) => {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'יש לנו תקלה',
                        text: 'מצטערים אבל משהו לא עבד, שווה לנסות בקרוב שוב',
                        confirmButtonText: 'בסדר',
                        confirmButtonColor: theme.palette.primary.main,
                        customClass: {
                            title: classes.swal,
                            content: classes.swal,
                            container: classes.swal,
                            confirmButton: classes.swal,
                        },
                    })
                })
        }
    }

    return {
        registerToEvent,
        cancelEventRegistration,
    }
}

interface Props {
    getEventById: Function
}

interface useEventRegistrationOutCome {
    registerToEvent: Function,
    cancelEventRegistration: Function,
}

export default useEventRegistration;