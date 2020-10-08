import * as types from '../actions/types';

const initial = {
  list: []
}

export default function collectionReducer(state = initial, action = {}){
  switch(action.type){
    case types.SET_COLLECTIONS:
      return {
        ...state,
        list: action.list
      }
    case types.ADD_COLLECTION:
      return {
        ...state,
        list: state.list.slice().concat([action.collection])
      }
    default:
      return state;
  }
}
