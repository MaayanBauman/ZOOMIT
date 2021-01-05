import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';

import Event from 'models/Event/Event';
import useStyles from './EventCardStyles';
  
const EventCard: React.FC<Props> = ({event}: Props): JSX.Element => {
    const classes = useStyles();
    
    return (
        <div >
           <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {event.title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {event.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
        </Card>
        </div>
    );
}
interface Props {
    event: Event;
}

export default EventCard;
