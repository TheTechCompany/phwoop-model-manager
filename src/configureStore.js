import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default function(){
  let store = createStore(reducers, applyMiddleware(thunk))
  return store;
}
