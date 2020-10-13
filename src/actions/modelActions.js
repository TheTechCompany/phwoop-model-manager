import * as types from './types';
const conf = require('../conf')

export function getModels(collection){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/collections/id/${collection}`).then((r) => r.json()).then((r) => {
      console.log(r)
      if(!r.error){
        console.log(r)
        dispatch({type: types.SET_MODELS, list: r.items})
      }
    })
  }
}

export function addModel(collection, name, ipfs){
  return (dispatch, getState) => {
    return fetch(`${conf.baseURL}/collections/id/${collection}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        ipfs: ipfs
      })
    }).then((r) => r.json()).then((r) => {
      dispatch({type: types.ADD_MODEL, model: r})
    })
  }
}

