import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        fontFamily: 'Assistant',
        direction: 'rtl',
    },
    pageContent: {
        height: 'calc(100vh - 65px)',
        overflow: 'auto',
    },
}));

export default useStyles;