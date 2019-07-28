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
    const { data, status } = error.response;
    // DISPATCH ARTICLE ERROR
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: data, status: status }
    });

    // DISPATCH SET ALERT
    dispatch(setAlert(data, status, 'danger'));
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
      payload: { msg: error.response.data, status: error.response.status }
    });
  }
};
