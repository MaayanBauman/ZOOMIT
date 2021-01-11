import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
      },
    closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    },
});

export default useStyles;