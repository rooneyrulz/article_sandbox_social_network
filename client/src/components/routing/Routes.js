import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

// COMPONENTS
import Landing from '../layouts/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Articles from '../articles/Articles';
import Alert from '../layouts/Alert';

// PRIVATE ROUTE
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => (
  <Container>
    <div className="alert-container">
      <Alert />
    </div>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={Landing} />
      <Route exact path="/sign-up" component={Register} />
      <Route exact path="/sign-in" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/articles" component={Articles} />
    </Switch>
  </Container>
);

export default Routes;
