import axios from 'axios';

import setAlert from './alertAction';

import {
  GET_PROFILES,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED
} from './types';

const uri = 'http://localhost:5000';

// GET ALL PROFILES
export const getProfiles = () => async dispatch => {
  // DISPATCH CLEAR PROFILE
  dispatch({ type: CLEAR_PROFILE });

  // DEFINE HEADERS
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/profile`, config);

    // DISPATCH GET PROFILES
    dispatch({ type: GET_PROFILES, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPATCH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// GET CURRENT PROFILE
export const getCurrentProfile = () => async dispatch => {
  // DEFINE HEADER
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/profile/me`, config);

    // DISPATCH GET CURRENT PROFILE
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    console.log(error.message);

    // DISPATCH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// GET PROFILE BY ID
export const getProfile = userId => async dispatch => {
  // DEFINE HEADER
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(
      `${uri}/api/profile/user/${userId}`,
      config
    );

    // DISPATCH GET CURRENT PROFILE
    dispatch({
      type: GET_PROFILE,
      payload: data
    });
  } catch (error) {
    console.log(error.message);

    // DISPATCH PROFILE ERROR
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// CREATE PROFILE
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  // DEFINE HEADER
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(`${uri}/api/profile`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: data
    });

    dispatch(
      setAlert(
        edit ? 'Profile Updated' : 'Profile Created', 200,
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 400, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD EXPERIENCES
export const addExperience = (formData, history) => async dispatch => {
  // DEFINE HEADER
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put(
      `${uri}/api/profile/experience`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });

    dispatch(setAlert('Experience Added', 200, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 400, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE EXPERIENCES
export const deleteExperience = id => async dispatch => {
  try {
    const { data } = await axios.delete(`${uri}/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });

    dispatch(setAlert('Experience Removed', 200, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// ADD EDUCATIONS
export const addEducation = (formData, history) => async dispatch => {
  // DEFINE HEADER
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put(
      `${uri}/api/profile/education`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });

    dispatch(setAlert('Education Added', 200, 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 400, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE EDUCATIONS
export const deleteEducation = id => async dispatch => {
  try {
    const { data } = await axios.delete(`${uri}/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data
    });

    dispatch(setAlert('Education Removed', 200, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// DELETE ACCOUNT & PROFILE
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`${uri}/api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlert('Your account has been permanantly deleted', 200, 'success')
      );
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
