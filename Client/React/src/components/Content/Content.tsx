import { Route, Switch } from 'react-router-dom';

import TopNavBar from './TopNavbar/TopNavBar';
import EventsPage from './EventsPage/EventsPage';
import ZoomerPage from './ZoomerPage/ZoomerPage';
import {eventsPageRoute, zoomerPageRoute} from 'utils/Routes/Routes';

const Content: React.FC = (): JSX.Element => {
   
    return (
        <div >
            <TopNavBar />
            <>
                <Switch>
                    <Route path={zoomerPageRoute} component={ZoomerPage} />
                    <Route path={eventsPageRoute} component={EventsPage} />
                    <Route path='/' exact component={EventsPage} />
                </Switch>
            </>
        </div>
    );
}

export default Content;
