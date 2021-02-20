import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    eventRow: {
        display: 'flex',
        width: '99vw',
    },
    title: {
        color: '#39394D',
        fontSize: 30,
        '& svg': {
            verticalAlign: 'middle',
            paddingBottom: '0.1em',
        }
    },
});

export default useStyles;