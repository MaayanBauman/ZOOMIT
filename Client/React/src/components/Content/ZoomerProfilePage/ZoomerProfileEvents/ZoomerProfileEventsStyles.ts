import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    crowdTitle: {
        fontSize: 25,
        color: theme.typography.subtitle1.color
    },
    searchArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        margin: '0 2vw',
    },
    filter: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

export default useStyles;