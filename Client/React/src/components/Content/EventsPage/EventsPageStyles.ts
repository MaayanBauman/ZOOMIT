import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display:'flex',
            flexDirection: 'column',
            marginTop: '5vh',
            fontFamily:'Assistant',
            marginRight: '3vw'
        },
        topbar: {
            direction: 'rtl',
            display: 'flex',
            flexDirection: 'row',
        },
        count:{
            color: '#868692',
            fontSize: 18,
        },
        search:{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            marginRight: '28vw',
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            paddingRight: '2px',
        },
        iconButton: {
            padding: 10,
            color: '#0C63CE',
        },
        divider: {
            height: 28,
            margin: 4,
        },
    })
);

export default useStyles;