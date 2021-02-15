import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        marginTop: '5vh',
        marginRight: '2vw',
        marginLeft: '2vw',
    },
    topbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    count:{
        fontSize: 18,
    },
    noEventsMsg:{
        marginRight: '2vw',
            marginTop: '2vh',
    },
    filterBox: {
        marginRight: '22vw'
    }
});

export default useStyles;