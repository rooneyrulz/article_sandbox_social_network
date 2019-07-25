import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Collapse
} from 'reactstrap';

const AppHeader = () => {
  const [state, setState] = useState({ isOpen: false });

  const toggle = () => setState({ ...state, isOpen: !state.isOpen });

  return (
    <Navbar light expand="md" className="py-3">
      <Container>
        <NavbarBrand href="/home">Article Sandbox</NavbarBrand>
        <NavbarToggler onClick={() => toggle()} />
        <Collapse navbar isOpen={state.isOpen}>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink exact to="/home" className="nav-link">
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/dashboard" className="nav-link">
                DASHBOARD
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/sign-up" className="nav-link">
                SIGN UP
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/sign-in" className="nav-link">
                SIGN IN
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
