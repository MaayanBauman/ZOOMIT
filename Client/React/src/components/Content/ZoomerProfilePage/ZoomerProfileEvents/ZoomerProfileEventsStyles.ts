import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    crowdTitle: {
        fontSize: 25,
        color: theme.typography.subtitle1.color
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        justifyContent: 'space-around'
    },
    eventsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));

export default useStyles;