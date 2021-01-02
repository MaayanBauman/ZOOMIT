import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import TopNavBar from './TopNavbar/TopNavBar';
import EventsPage from './EventsPage/EventsPage';
import ZoomerPage from './ZoomerPage/ZoomerPage';
import {eventsPageRoute, zoomerPageRoute} from 'utils/Routes/Routes';

const Content: React.FC = (): JSX.Element => {
    let { path, url } = useRouteMatch();

    return (
        <div >
            <TopNavBar />
            <>
                <Switch>
                    <Route path={`${path}${zoomerPageRoute}`} component={ZoomerPage} />
                    <Route path={`${path}${eventsPageRoute}`} component={EventsPage} />
                    <Route path={`${path}`} exact component={EventsPage} />
                </Switch>
            </>
        </div>
    );
}

export default Content;
