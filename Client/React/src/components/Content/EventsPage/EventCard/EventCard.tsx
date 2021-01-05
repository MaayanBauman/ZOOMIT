import { Typography, Card, CardContent, CardActions, makeStyles, Button } from '@material-ui/core';
const useStyles = makeStyles({
    root: {
      width: '20vw',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  

const EventCard: React.FC = (): JSX.Element => {
    const classes = useStyles();
    
    return (
        <div >
           <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        tnts
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
        </Card>
        </div>
    );
}

export default EventCard;
