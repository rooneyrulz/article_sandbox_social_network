import React from 'react';
import { Button } from 'reactstrap';

const Landing = () => (
  <div id="Landing">
    <h1 className="display-3">Article Sandbox</h1>
    <br />
    <br />
    <Button
      style={{ padding: '.8em 2em', margin: '5px' }}
      color="primary"
      className="btn btn-lg"
    >
      Sign Up
    </Button>
    <Button
      style={{ padding: '.8em 2em', margin: '5px' }}
      color="dark"
      className="btn btn-lg"
    >
      Sign In
    </Button>
  </div>
);

export default Landing;
