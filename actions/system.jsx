import { RESPONSE_SIDE_QUESTS, RESPONSE_HUNTS, SYSTEM_VERSION_UPDATED } from '../constants/ActionTypes';
import { SYSTEM_INIT, SYSTEM_CONFIG_RESPONSE } from '../constants/ActionTypes';
import { receiveSideQuests, requestSideQuests } from './quests';
import { receiveHunts, requestHunts } from './hunts';

const receiveGeneratedData = (status, json, version) => (dispatch) => {
  dispatch(receiveSideQuests(status, json.sideQuests))
  dispatch(receiveHunts(status, json.hunts))
  dispatch(updateVersion('generated', version))
}

export const fetchGeneratedData = (version) => (dispatch) => {

  // Inform the app we start the request
  dispatch(requestSideQuests())
  dispatch(requestHunts())

  return fetch('./data-generated.json')
    .then(response => response.json())
    .then(json => dispatch(receiveGeneratedData('success', json, version)))
    .catch(err => dispatch(receiveGeneratedData('error', err)))
}

export const updateVersion = (key, version) => {
  return {
    type: SYSTEM_VERSION_UPDATED,
    key, version
  }
}

export const initSystem = () => (dispatch) => {

  dispatch({type: SYSTEM_INIT})

  return fetch('./config.json')
    .then(r => r.json())
    .then(json => dispatch({
      type: SYSTEM_CONFIG_RESPONSE, success: true, json
    }))
    .catch(err => dispatch({
      type: SYSTEM_CONFIG_RESPONSE, success: false, err
    }))
}