import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

// COMPONENTS
import Landing from '../layouts/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';

const Routes = () => (
  <Container>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={Landing} />
      <Route exact path="/sign-up" component={Register} />
      <Route exact path="/sign-in" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </Container>
);

export default Routes;
