import axios from 'axios';

import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  DELETE_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT
} from './types';
import setAlert from '../actions/alertAction';

const uri = 'http://localhost:5000';

// GET ARTICLES
export const getArticles = () => async dispatch => {
  // DEFINE HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/article`, config);

    // DISPATCH GET ARTICLES
    dispatch({ type: GET_ARTICLES, payload: data });
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(
      setAlert(error.response.data, error.response.status, 'danger')
    );
  }
};

// GET ARTICLE
export const getArticle = id => async dispatch => {
  // DEFINE HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.get(`${uri}/api/article/${id}`, config);

    // DISPATCH GET ARTICLE
    dispatch({ type: GET_ARTICLE, payload: data });
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, error.response.status, 'danger'));
  }
};

// LIKE ARTICLE
export const likeArticle = id => async dispatch => {
  // DEFINE HEADER
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put(`${uri}/api/article/like/${id}`, config);

    // DISPATCH UPDATE LIKE
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: data } });
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, error.response.status, 'danger'));
  }
};

// UNLIKE ARTICLE
export const unLikeArticle = id => async dispatch => {
  // DEFINE HEADER
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.put(`${uri}/api/article/unlike/${id}`, config);

    // DISPATCH UPDATE LIKE
    dispatch({ type: UPDATE_LIKES, payload: { id, likes: data } });
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, error.response.status, 'danger'));
  }
};

// ADD ARTICLE
export const addArticle = formData => async dispatch => {
  // DEFINE HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(
      `${uri}/api/article/create`,
      formData,
      config
    );

    // DISPATCH ADD ARTICLE
    dispatch({ type: ADD_ARTICLE, payload: data });
  } catch (error) {
    if (error.response.data.errors) {
      const { errors } = error.response.data;
      errors.forEach(err => {
        // DISPATCH ARTICLE ERROR
        dispatch({
          type: ARTICLE_ERROR,
          payload: {
            msg: err.msg,
            status: err.status
          }
        });
        // DISPATCH SET ALERT
        dispatch(setAlert(err.msg, err.status, 'danger'));
      });
    } else {
      // DISPATCH ARTICLE ERROR
      dispatch({
        type: ARTICLE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });

      // DISPATCH SET ALERT
      dispatch(setAlert(error.response.data, error.response.status, 'danger'));
    }
  }
};

// DELETE ARTICLE
export const deleteArticle = id => async dispatch => {
  // DEFINE HEADERS
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(`${uri}/api/article/${id}`, config);

    // DISPATCH DELETE ARTICLE
    dispatch({ type: DELETE_ARTICLE, payload: id });

    // DISPATCH SET ALERT
    dispatch(setAlert('Article deleted!', 200, 'success'));
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, error.response.status, 'danger'));
  }
};

// ADD COMMENT
export const addComment = (formData, id) => async dispatch => {
  // DEFINE HEADER
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const { data } = await axios.post(
      `${uri}/api/article/comment/${id}`,
      formData,
      config
    );

    // DISPATCH ADD COMMENT
    dispatch({ type: ADD_COMMENT, payload: data });

    // DISPATCH SET ALERT
    dispatch(setAlert('Comment added!', 201, 'success'));
  } catch (error) {
    if (error.response.data.errors) {
      const { errors } = error.response.data;
      errors.forEach(err => {
        // DISPATCH ARTICLE ERROR
        dispatch({
          type: ARTICLE_ERROR,
          payload: {
            msg: err.msg,
            status: err.status
          }
        });
        // DISPATCH SET ALERT
        dispatch(setAlert(err.msg, err.status, 'danger'));
      });
    } else {
      // DISPATCH ARTICLE ERROR
      dispatch({
        type: ARTICLE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });

      // DISPATCH SET ALERT
      dispatch(setAlert(error.response.data, error.response.status, 'danger'));
    }
  }
};

// DELETE COMMENT
export const deletedComment = (artId, comntId) => async dispatch => {
  // DEFINE HEADER
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${uri}/api/article/comment/${artId}/${comntId}`,
      config
    );

    // DISPATCH ADD COMMENT
    dispatch({ type: DELETE_COMMENT, payload: comntId });

    // DISPATCH SET ALERT
    dispatch(setAlert('Comment deleted!', 200, 'success'));
  } catch (error) {
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: {
        msg: error.response.data,
        status: error.response.status
      }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(error.response.data, error.response.status, 'danger'));
  }
};
