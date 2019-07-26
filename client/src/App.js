import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import AppNavbar from './components/layouts/AppHeader';
import RoutingComponents from './components/routing/Routes';

// REDUX
import Store from './store';
import { loadUser } from './actions/authAction';

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={Store}>
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
    </Provider>
  );
};

export default App;
