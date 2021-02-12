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
        marginBottom: '1vh',
        marginTop : '2vh'
    }, 
    label: {
        width: '5vw'
    },
    calendarIcon: {
        color: theme.palette.secondary.main
    },
    datePickers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop : '2vh'
    },
    picker: {
        width: '12vw'
    },
    dialogButton: {
        marginRight: '1vw',
        width: '8vw'
    },
    number: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
}));

export default useStyles;