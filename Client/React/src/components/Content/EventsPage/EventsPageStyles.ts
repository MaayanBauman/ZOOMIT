import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        display:'flex',
        flexDirection: 'column',
        marginTop: '5vh',
        fontFamily:'Assistant',
        marginRight: '3vw'
    },
    topbar: {
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'row',
    },
    count:{
        color: '#868692',
        fontSize: 18,
    },
});

export default useStyles;