import { makeStyles } from '@material-ui/styles';
import theme from 'assets/styles/theme';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '7vh',
        marginRight: '4vw',
        marginLeft: '4vw'
    },
    headLine: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(228, 247, 235, .5)',
        borderRadius: '0px 30px 30px 0px',
        width: '35vw',
        '& img': {
            borderRadius: '30px',
            height: '136px',
            marginLeft: '20px',
            cursor: 'pointer',
        },
    },
    headDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    zoomerWith: {
        fontSize: 19,
        lineHeight: '1.1'
    },
    zoomer: {
        fontWeight: 'bold',
        fontSize: 20,
        cursor: 'pointer',
    },
    detailsLine: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5vh',
        width: '65vw',
        '& hr': {
            width: '3px',
            backgroundColor: theme.typography.caption.color,
            borderRadius: '4px',
            margin: '0 2vw',
        }
    },
    detailsContainer: {
        minWidth: '15vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& p': {
            lineHeight: 2.2,
        }
    },
    descContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    registerLine: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '5vh',
        backgroundColor: theme.backgrounds.bg2,
        padding: '2rem 4vw',
    },
    registerAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& button': {
            padding: '12px 35px',
            fontSize: '25px',
        },
        '& h6': {
            fontSize: '0.8rem'
        }
    },
    registerDesc: {
        marginRight: '32px',
    },
    swal: {
        fontFamily: 'Assistant'
    },
});

export default useStyles;