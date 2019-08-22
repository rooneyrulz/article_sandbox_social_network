import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardActions from './DashboardActions';
import Spinner from '../layouts/Spinner';

import { getCurrentProfile } from '../../actions/profileAction';

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="Dashboard">
        <h1 className="display-4 text-primary">Dashboard</h1>
        {user && (
          <Fragment>
            <p className="lead">Welcome {user.name}</p>
          </Fragment>
        )}
        {profile !== null ? (
          <DashboardActions />
        ) : (
          <Fragment>
            <p className="lead">
              It seems you have not setup your profile yet!
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
