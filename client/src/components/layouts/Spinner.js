import React, { Fragment } from 'react';

import spinner from './spinner.gif';

const Spinner = () => <Fragment>
    <img style={{ 
      display: 'block',
      margin: 'auto',
      textAlign: 'center',
      width: '200px'
    }} src={spinner} alt="Article Sandbox Spinner"/>
  </Fragment>;

export default Spinner;