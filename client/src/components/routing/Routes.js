import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

// COMPONENTS
import Landing from '../layouts/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Articles from '../articles/Articles';
import Article from '../article/Article';
import Alert from '../layouts/Alert';
import Profiles from '../profiles/Profiles';
import ProfileItem from '../profiles/ProfileItem';
import CreateProfile from '../profile-forms/CreateProfile';

// PRIVATE ROUTE
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => (
  <Container>
    <div className="alert-container">
      <Alert />
    </div>
    <Switch>
      <Redirect exact from="/" to="/landing" />
      <Route exact path="/landing" component={Landing} />
      <Route exact path="/sign-up" component={Register} />
      <Route exact path="/sign-in" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/articles" component={Articles} />
      <Route exact path="/profiles" component={Profiles} />
      <PrivateRoute exact path="/create-profile" component={CreateProfile} />
      <Route exact path="/article/:id" component={Article} />
      <Route exact path="/profile/:id" component={ProfileItem} />
    </Switch>
  </Container>
);

export default Routes;
