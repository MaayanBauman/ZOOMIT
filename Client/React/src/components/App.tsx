import { Route, Switch } from 'react-router-dom';

import LandingPage from 'components/LandingPage/LandingPage';
import Content from 'components/Content/Content';
import {contentRoute, landingPageRoute} from 'utils/Routes/Routes';
import LoadingSpinner  from 'utils/LoadingSpinner/LoadingSpinner';

const App: React.FC = (): JSX.Element => {
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
