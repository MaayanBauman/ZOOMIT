import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        color: '#0C63CE',
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
        color: '#0C63CE',
        marginRight: theme.spacing(2.8),
        fontSize: 16
    },
    admin: {
        color: '#868692',
    },
    activeItem: {
        textDecorationLine: 'underline!important',
        color: '#0C63CE'
    },
    menuLink: {
        textDecoration: 'none'
    }
}));

export default useStyles;