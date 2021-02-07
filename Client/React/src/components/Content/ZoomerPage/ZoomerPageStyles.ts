import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    zoomerDetailes: {
        display: 'flex', 
        flexDirection: 'column',
        marginRight: '5vw',
        height: '40vh'
    },
    zoomerImg: {
        width: '7vw',
        height: '7vw'
    }, 
    zoomerHead: {
        marginTop: '7vh',
        display: 'flex',
        flexDirection: 'row'
    }, 
    zoomerName: {
        fontSize: 30,
        color: theme.typography.subtitle1.color
    }, 
    zoomerApprovedDate: {

    },
    zoomerTitle:{
        
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