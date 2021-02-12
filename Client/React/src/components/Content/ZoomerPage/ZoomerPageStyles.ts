import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    zoomerDetailes: {
        display: 'flex', 
        flexDirection: 'column',
        marginRight: '2vw',
        height: '43vh',
        overflowY: 'auto'
    },
    zoomerImg: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    }, 
    zoomerHead: {
        marginTop: '3vh',
        display: 'flex',
        flexDirection: 'row'
    }, 
    zoomerName: {
        fontSize: 30,
        color: theme.typography.subtitle1.color
    }, 
    zoomerApprovedDate: {

    },
    zoomerTitle: {
        marginRight: '2vw',
    },
    zoomerEditDesc: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    zoomerDescription: {
        marginTop: '3vh',
        width: '50vw'
    }, 
    descEditIcon: {
        color: theme.typography.body2.color,
    }
}));

export default useStyles;