import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles({
    container:{
        display:'flex',
        flexDirection: 'column',
    },
    eventRow: {
         display:'flex',
         width: '100vw',
         justifyContent: 'flex-end'  
    },
    title: {
        alignSelf: 'flex-end',
        color: '#39394D',
        fontSize: 30,
    }
});

export default useStyles;