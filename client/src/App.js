import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// COMPONENTS
import AppNavbar from './components/layouts/AppHeader';
import RoutingComponents from './components/routing/Routes';

const App = () => {
  return (
    <Router>
      <Fragment>
        <header className="mb-5">
          <AppNavbar />
        </header>
        <main>
          <Switch>
            <Route component={RoutingComponents} />
          </Switch>
        </main>
        <footer></footer>
      </Fragment>
    </Router>
  );
};

export default App;
