import {
  GET_ARTICLES,
  GET_ARTICLE,
  ADD_ARTICLE,
  DELETE_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  articles: [],
  article: null,
  loading: true,
  error: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false
      };

    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false
      };

    case ADD_ARTICLE:
      return {
        ...state,
        articles: [payload, ...state.articles],
        loading: false
      };

    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article._id !== payload),
        loading: false
      };

    case ARTICLE_ERROR:
      return {
        ...state,
        error: [payload, ...state.error],
        loading: false
      };

    case UPDATE_LIKES:
      return {
        ...state,
        articles: state.articles.map(article =>
          article._id === payload.id
            ? { ...article, likes: payload.likes }
            : article
        ),
        loading: false
      };

    case ADD_COMMENT:
      return {
        ...state,
        article: { ...state.article, payload },
        loading: false
      };

    case DELETE_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.article.comments.filter(cmnt => cmnt._id !== payload)
        },
        loading: false
      };

    default:
      return state;
  }
};
