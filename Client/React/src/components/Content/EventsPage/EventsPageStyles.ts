import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
   container: {
       display:'flex',
       flexDirection: 'row',
       marginTop: '5vh',
       justifyContent: 'flex-start',
       width: '100vw'
   },
   eventRow: {
        display:'flex',
        width: '100vw',
        justifyContent: 'flex-end',
   }
});

export default useStyles;