import * as types from './types';
const conf = require('../conf')

export function getCollections(){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/collections`).then((r) => r.json()).then((r) => {
      dispatch({type: types.SET_COLLECTIONS, list: r})
    })
  }
}

export function addCollection(type, name){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/collections/${type}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.ADD_COLLECTION, collection: r})
    })
  }
}

