import { combineReducers } from 'redux';

import model from './model';
import collection from './collection';

export default combineReducers({
  collection,
  model
})
