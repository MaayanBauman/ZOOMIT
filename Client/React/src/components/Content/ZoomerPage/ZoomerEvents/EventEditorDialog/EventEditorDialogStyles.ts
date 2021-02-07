import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    dialogTitle: {
        fontColor: theme.typography.body2,
        display: 'flex',
        justifyContent: 'center'
    },
    formRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1vh'
    }, 
    label: {
        width: '5vw'
    }, 
    fieldInput: {
        
    }, 
    calendarIcon: {
        color: theme.palette.secondary.main
    }
}));

export default useStyles;