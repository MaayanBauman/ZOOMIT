import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
          color: theme.typography.body2.color,
      },
      divider: {
          height: 28,
          margin: 4,
      }
    })
);

export default useStyles;