import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadSpinner from '../layouts/Spinner';

const Dashboard = ({ auth: { user }, profile: { loading, profile } }) => {
  return loading && profile === null ? (
    <LoadSpinner />
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
          <h1>My Profile Actions</h1>
        ) : (
          <Fragment>
            <p className="lead">
              It seems you have not setup your profile yet!
            </p>
            <link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(Dashboard);
