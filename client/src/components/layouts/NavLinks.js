import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

const NavLinks = ({ isAuthenticated, logoutUser }) => {
  const authLinks = (
    <Fragment>
      <NavItem>
        <NavLink exact to="/dashboard" className="nav-link">
          DASHBOARD
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => logoutUser()} to="#!" className="nav-link">
          SIGN OUT
        </NavLink>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink exact to="/home" className="nav-link">
          HOME
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
    </Fragment>
  );

  return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
};

export default NavLinks;
