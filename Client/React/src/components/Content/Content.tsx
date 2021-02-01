import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import TopNavBar from './TopNavbar/TopNavBar';
import EventPage from './EventPage/EventPage';
import EventsPage from './EventsPage/EventsPage';
import ZoomerPage from './ZoomerPage/ZoomerPage';
import ManagePage from './ManagePage/ManagePage';
import ProfilePage from './ProfilePage/ProfilePage';

import {eventsPageRoute, zoomerPageRoute, profilePageRoute, eventPageRoute, managePageRoute } from 'utils/Routes/Routes';

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
                    <Route path={`${path}${managePageRoute}`} component={ManagePage} />
                    <Route path={path} exact component={EventsPage} />
                </Switch>
            </>
        </div>
    );
}

export default Content;
