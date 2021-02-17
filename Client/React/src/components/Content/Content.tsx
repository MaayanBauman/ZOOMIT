import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import User from 'models/User/User';
import TopNavBar from './TopNavbar/TopNavBar';
import EventPage from './EventPage/EventPage';
import EventsPage from './EventsPage/EventsPage';
import ZoomerPage from './ZoomerPage/ZoomerPage';
import ZoomerProfilePage from './ZoomerProfilePage/ZoomerProfile';
import ManagePage from './ManagePage/ManagePage';
import StoreStateType from 'redux/storeStateType';
import ProfilePage from './ProfilePage/ProfilePage';
import { initialState } from 'redux/User/userReducer';
import {
    eventsPageRoute, zoomerPageRoute, profilePageRoute,
    eventPageRoute, managePageRoute, landingPageRoute, zoomerProfilePageRoute
} from 'utils/Routes/Routes';

import useStyles from './ContentStyles';
import Alert from './Alert/Alert';

const Content: React.FC = (): JSX.Element => {

    const { path } = useRouteMatch();
    const classes = useStyles();

    const user = useSelector<StoreStateType, User>(state => state.user);
    return (
        <>
            {
                user._id !== initialState._id ?
                    <div className={classes.content} >
                        <TopNavBar />
                        <div className={classes.pageContent}>
                            <Switch>
                                <Route path={`${path}${zoomerPageRoute}`} component={ZoomerPage} />
                                <Route path={`${path}${eventsPageRoute}`} component={EventsPage} />
                                <Route path={`${path}${eventPageRoute}`} component={EventPage} />
                                <Route path={`${path}${profilePageRoute}`} component={ProfilePage} />
                                <Route path={`${path}${zoomerProfilePageRoute}`} component={ZoomerProfilePage} />
                                <Route path={`${path}${managePageRoute}`} component={ManagePage} />
                                <Route path={path} exact component={EventsPage} />
                            </Switch>
                        </div>
                        <Alert />
                    </div> :
                    <Redirect to={landingPageRoute} />
            }
        </>
    );
}

export default Content;
