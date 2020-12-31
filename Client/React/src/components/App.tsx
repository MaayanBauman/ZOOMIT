import { Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from 'components/LandingPage/LandingPage';
import EventsPage from 'components/EventsPage/EventsPage';
import {eventsPageRoute, landingPageRoute} from 'utils/Routes/Routes';
const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route path={landingPageRoute} component={LandingPage} />
        <Route path={eventsPageRoute} component={EventsPage} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </>
  );
}

export default App;
