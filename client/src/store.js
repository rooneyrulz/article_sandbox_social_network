import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// IMPORT ROOT REDUCER
import rootReducer from './reducers';

const middleware = [thunk];

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
