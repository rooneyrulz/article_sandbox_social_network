import { combineReducers } from 'redux';

import auth from './authReducer';
import alert from './alertReducer';
import article from './articleReducer';
import profile from './profileReducer';

export default combineReducers({
  auth,
  article,
  profile,
  alert
});
