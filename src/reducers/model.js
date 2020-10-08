import * as types from '../actions/types';

const initial = {
  list: []
}

export default function collectionReducer(state = initial, action = {}){
  switch(action.type){
    case types.ADD_MODEL:
      return {
        ...state,
        list: state.list.slice().concat([action.model])
      }
    case types.SET_MODELS:
      return {
        ...state,
        list: action.list
      }
    default:
      return state;
  }
}
