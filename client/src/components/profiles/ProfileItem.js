import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Row, Col } from 'reactstrap';

const ProfileItem = ({ profile: { id, user, date } }) => {
  return (
    <div className="profile-item text-center">
      <Row>
        <Col sm="4">
          <img src="" alt="profile-avatar" />
        </Col>
        <Col sm="4">
          <p>
            <span className="lead">{user.name}</span>
            <br/>
            <small>
              <Moment format="YYYY/MM/DD" date={date} />
            </small>
          </p>
        </Col>
        <Col sm="4">
          <Link className="btn btn-light" to="">
            View
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileItem;
