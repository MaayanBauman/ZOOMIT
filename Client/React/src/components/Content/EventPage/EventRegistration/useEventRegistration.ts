import Swal from 'sweetalert2';
import useStyles from './EventRegistrationStyles';

const useEventRegistration = (): useEventRegistrationOutCome => {
    const classes = useStyles();

    const registerToEvent = (userId: String, eventId: String) => {
        Swal.fire({
            title: `${userId}`,
            text: `${eventId}`,
            icon: 'success',
            confirmButtonText: 'יאלה קח אותי',
            customClass: {
                title: classes.swal,
                content: classes.swal,
                container: classes.swal
            },
        }).then(() => {

        })
        /*if (userId && userId != "" && eventId && eventId != "") {
            axios.put(`/users/${userId}/events/${eventId}`, {})
                .then((result: any) => {
                    Swal.fire({
                        title: 'איזה כיף שנרשמת!',
                        text: ',תמשיך הלאה לכל האירועים',
                        icon: 'success',
                        confirmButtonText: 'יאלה קח אותי',
                        customClass: {
                            title: classes.swal,
                            content: classes.swal,
                            container: classes.swal
                        },
                    }).then(() => {

                    })
                })
                .catch((error: any) => (
                    console.log(error)
                ))
        }*/
    }

    return {
        registerToEvent
    }
}


interface useEventRegistrationOutCome {
    registerToEvent: Function,
}

export default useEventRegistration;