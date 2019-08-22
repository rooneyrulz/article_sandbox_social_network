import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {} from 'reactstrap';

import ProfileItem from './ProfileItem';
import Spinner from '../layouts/Spinner';

import { getProfiles } from '../../actions/profileAction';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className="Profiles">
      <h1 className="text-primary mb-5">Profiles</h1>
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {profiles.length < 1 ? (
              <p className="lead">No profiles found..</p>
            ) : (
              <div className="profile-items">
                {profiles.map(profile => (
                  <ProfileItem key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
