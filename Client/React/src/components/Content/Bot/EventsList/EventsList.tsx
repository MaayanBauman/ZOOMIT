import { List, ListItem } from '@material-ui/core';

import Event, {FullEvent} from 'models/Event/Event';
import SmallEventCard  from '../SmallEventCard/SmallEventCard';

const EventsList: React.FC<Props> = ({ events }: Props): JSX.Element => {   
    return (
        <div>
            <List>
                {events?.map((event: FullEvent) => 
                    <ListItem>
                            <SmallEventCard event={event}>
                            </SmallEventCard>
                    </ListItem>)}
            </List> 
        </div>
    );
}

interface Props {
    events: FullEvent[];
}

export default EventsList;
