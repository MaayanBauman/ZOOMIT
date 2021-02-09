import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import backgroundImage from 'assets/images/background.png';

const useStyles = makeStyles((theme: Theme) => ({
    tableContainer: {
        maxWidth: '92vw',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        flexDirection: 'column'
    },
    icon:{
        color: theme.palette.secondary.main
    },
    tableTitles: {
        backgroundColor: theme.palette.secondary.light
    },
    eventActions: {
        display: 'flex',
        flexDirection: 'row', 
    },
    table: {
        margin: '1vh',
        overflowY: 'auto'
    },
    addEventButton: {
        color: theme.palette.primary.main,
        width: '3vw',
        height: '3vw'
    },
    searchAndAdd:{
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        justifyContent: 'space-around'
    }
}));

export default useStyles;