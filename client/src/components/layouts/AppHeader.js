import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  Container,
  Collapse
} from 'reactstrap';

import NavLinks from './NavLinks';
import { logoutUser } from '../../actions/authAction';

const AppHeader = ({ isAuthenticated, logoutUser }) => {
  const [state, setState] = useState({ isOpen: false });

  const toggle = () => setState({ ...state, isOpen: !state.isOpen });

  return (
    <Navbar light expand="md" className="py-3">
      <Container>
        <NavbarBrand href="/home">Article Sandbox</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse navbar isOpen={state.isOpen}>
          <Nav navbar className="ml-auto">
            <NavLinks
              isAuthenticated={isAuthenticated}
              logoutUser={logoutUser}
            />
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppHeader);
