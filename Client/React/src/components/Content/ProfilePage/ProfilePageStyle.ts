import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display:'flex',
            flexDirection: 'column',
            marginRight: '2vw',
            marginLeft: '2vw',
        },
        topbar: {
            alignItems: 'center',
            display: 'flex',
            justifyContent:'space-between',
            marginTop: '3vh',
        },
        categories_section:{
            height: '25vh',
        },
        linked_events_section:{
            height: '25vh',
        },
        user_info:{
            display: 'flex',
        },
        title: {
            fontSize: 30,
            marginRight: '2vw',
        },
        avatar:{
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        user_actions:{
            alignItems: 'center',
        },
        zoomer_requast_btn:{
            width: '18vw',
            height: '8vh',
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: '9vh',
            marginBottom: '2vh',
        },
        categoriesContainer: {
            alignItems: 'center',
            height: '20vh',
            width: 'fit-content',
        },
        category:{
            width: '10vw',
        },
        noEventsMsg: {
            marginRight: '2vw',
            marginTop: '2vh',
        }
    })
);

export default useStyles;