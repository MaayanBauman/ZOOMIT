import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
    root: {
        width: '800px',
        height: '70vh'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    swal: {
      fontFamily: 'Assistant'
    }
});

export default useStyles;