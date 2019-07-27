import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadSpinner from '../layouts/Spinner';

const Dashboard = ({
  auth: {
    loading,
    user: { name }
  }
}) => {
  return loading ? <LoadSpinner /> : (
    <div id="Dashboard">
      <h1 className="display-4">Dashboard</h1>
      <br />
      {name && <p className="lead">Welcome {name}</p>}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
