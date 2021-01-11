import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import TopNavBar from './TopNavbar/TopNavBar';
import EventsPage from './EventsPage/EventsPage';
import EventPage from './EventPage/EventPage';
import ZoomerPage from './ZoomerPage/ZoomerPage';
import ProfilePage from './ProfilePage/ProfilePage';

import {eventsPageRoute, zoomerPageRoute, profilePageRoute, eventPageRoute } from 'utils/Routes/Routes';

import useStyles from './ContentStyles';

const Content: React.FC = (): JSX.Element => {
    const { path } = useRouteMatch();
    const classes = useStyles();

    return (
        <div className={classes.content} >
            <TopNavBar/>
            <>
                <Switch>
                    <Route path={`${path}${zoomerPageRoute}`} component={ZoomerPage} />
                    <Route path={`${path}${eventsPageRoute}`} component={EventsPage} />
                    <Route path={`${path}${eventPageRoute}`} component={EventPage} />
                    <Route path={`${path}${profilePageRoute}`} component={ProfilePage} />
                    <Route path={path} exact component={EventsPage} />
                </Switch>
            </>
        </div>
    );
}

export default Content;
