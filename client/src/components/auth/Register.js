import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { registerUser } from '../../actions/authAction.js';

const Register = ({ isAuthenticated, registerUser, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const { name, email, password, cPassword } = formData;

  const onHandleChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onHandleSubmit = e => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
      cPassword
    };
    registerUser(payload);
  };

  if (isAuthenticated) history.push('/dashboard');

  return (
    <Fragment>
      <header className="text-center">
        <h1 className="text-primary">Sign Up</h1>
      </header>
      <br />
      <br />
      <Form id="form-register" onSubmit={e => onHandleSubmit(e)}>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                className="form-control form-control-lg"
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                className="form-control form-control-lg"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                onChange={e => onHandleChange(e)}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                className="form-control form-control-lg"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label htmlFor="cPassword">Confirm Password</Label>
              <Input
                className="form-control form-control-lg"
                type="password"
                name="cPassword"
                id="cPassword"
                placeholder="Confirm Password"
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit" className="btn btn-lg">
          Sign Up
        </Button>
        <p className="text-center mt-5">
          If you already have an account, Let's <Link to="/sign-in">Sign In</Link>
        </p>
      </Form>
    </Fragment>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
