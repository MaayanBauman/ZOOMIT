import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        color: theme.typography.body2.color,
        backgroundColor: '#FFFFFF'
    },
    rightSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1
    },
    leftSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        color: 'white',
        marginRight: theme.spacing(1)
    },
    menuTypog: {
        color: theme.typography.body2.color,
        marginRight: theme.spacing(2.8),
        fontSize: 16
    },
    admin: {
        color: theme.typography.body1.color,
    },
    activeItem: {
        textDecorationLine: 'underline!important',
        color: theme.typography.body2.color
    },
    menuLink: {
        textDecoration: 'none'
    }
}));

export default useStyles;