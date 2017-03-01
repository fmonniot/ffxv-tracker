import { RESPONSE_SIDE_QUESTS, RESPONSE_HUNTS, SYSTEM_VERSION_UPDATED } from '../constants/ActionTypes';
import { SYSTEM_INIT, SYSTEM_CONFIG_RESPONSE } from '../constants/ActionTypes';
import { receiveSideQuests, requestSideQuests } from './quests';
import { receiveHunts, requestHunts } from './hunts';

export const fetchHunts = (version) => (dispatch) => {
  dispatch(requestHunts())

  return fetch('./data/hunts.json')
    .then(response => response.json())
    .then(json => dispatch(receiveHunts('success', json, version)))
    .catch(err => dispatch(receiveHunts('error', err)))
}

export const fetchSideQuests = (version) => (dispatch) => {
  dispatch(requestSideQuests())

  return fetch('./data/side-quests.json')
    .then(response => response.json())
    .then(json => dispatch(receiveSideQuests('success', json, version)))
    .catch(err => dispatch(receiveSideQuests('error', err)))
}

export const updateVersion = (key, version) => {
  return {
    type: SYSTEM_VERSION_UPDATED,
    key, version
  }
}

export const initSystem = () => (dispatch) => {

  dispatch({type: SYSTEM_INIT})

  return fetch('./data/config.json')
    .then(r => r.json())
    .then(json => dispatch({
      type: SYSTEM_CONFIG_RESPONSE, success: true, json
    }))
    .catch(err => dispatch({
      type: SYSTEM_CONFIG_RESPONSE, success: false, err
    }))
}