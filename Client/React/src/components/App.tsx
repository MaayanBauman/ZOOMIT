import React from "react";
import { Route, Switch } from 'react-router-dom';
import LandingPage from 'components/LandingPage/LandingPage';
import Content from 'components/Content/Content';
import { contentRoute, landingPageRoute } from 'utils/Routes/Routes';
import LoadingSpinner from 'utils/LoadingSpinner/LoadingSpinner';

import { conectToSocket } from "./useApp";
import { useSelector } from "react-redux";
import User from "models/User/User";
import StoreStateType from "redux/storeStateType";

const App: React.FC = (): JSX.Element => {
  const user = useSelector<StoreStateType, User>(state => state.user);
  conectToSocket(user);
  
  return (
    <>
      <Switch>
        <Route path={landingPageRoute} component={LandingPage} />
        <Route path={contentRoute} component={Content} />
        <Route path='/' exact component={LandingPage} />
      </Switch>
      <LoadingSpinner />
    </>
  );
}

export default App;
