import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onHandleChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onHandleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Fragment>
      <header className="text-center">
        <h1 className="display-4">Sign In</h1>
      </header>
      <br />
      <br />
      <Form id="form-login" onSubmit={e => onHandleSubmit(e)}>
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
        <Button color="primary" type="submit" className="btn btn-lg">
          Sign In
        </Button>
        <p className="text-center mt-5">
          Don't you already have an account? Let's{' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </Form>
    </Fragment>
  );
};

export default Login;
