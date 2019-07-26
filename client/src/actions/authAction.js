import axios from 'axios';

import setAlert from './alertAction';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR
} from './types';

const uri = 'http://localhost:5000';

// LOAD USER
export const loadUser = () => async dispatch => {
  // CHECK TOKEN ON LOCALSTORAGE
  if (localStorage.token) setAuthToken(localStorage.token);

  // DEFINE HEADER VALUES
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const {
      data: { user }
    } = await axios.get(`${uri}/api/auth/user`, config);

    // DISPATCH USER LOADED
    dispatch({ type: USER_LOADED, payload: user });
  } catch (error) {
    // DISPATCH AUTH ERROR
    dispatch({ type: AUTH_ERROR });
  }
};

// REGISTER USER
export const registerUser = ({
  name,
  email,
  password,
  cPassword
}) => async dispatch => {
  // DEFINE HEADER VALUE
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    name,
    email,
    password,
    cPassword
  };

  try {
    const { data } = await axios.post(`${uri}/api/user/register`, body, config);

    // DISPATCH REGISTER SUCCESS
    dispatch({ type: REGISTER_SUCCESS, payload: data });

    // DISPATCH LOAD USER
    dispatch(loadUser());
  } catch (error) {
    // DISPATCH REGISTER FAIL
    dispatch({ type: REGISTER_FAIL });

    // DISPATCH SET ALERT IF ERRORS EXIST
    if (error.response.data.errors) {
      const { errors } = error.response.data;
      errors.map(error => dispatch(setAlert(error.msg, 400, 'danger')));
    } else {
      // DISPATCH SET ALERT
      dispatch(setAlert(error.response.data, error.response.status, 'danger'));
    }
  }
};

// AUTHENTICATE USER
export const loginUser = (email, password) => async dispatch => {
  // DEFINE HEADER VALUE
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  const body = { email, password };

  try {
    const { data } = await axios.post(`${uri}/api/auth`, body, config);

    // DISPATCH LOGIN SUCCESS
    dispatch({ type: LOGIN_SUCCESS, payload: data });

    // DISPATCH LOAD USER
    dispatch(loadUser());
  } catch (error) {
    // DISPATCH LOGIN FAIL
    dispatch({ type: LOGIN_FAIL });

    // DISPATCH SET ALERT IF ERRORS EXIST
    if (error.response.data.errors) {
      const { errors } = error.response.data;
      console.log(errors);
      errors.forEach(error => dispatch(setAlert(error.msg, 400, 'danger')));
    } else {
      // DISPATCH SET ALERT
      dispatch(setAlert(error.response.data, error.response.status, 'danger'));
    }
  }
};
