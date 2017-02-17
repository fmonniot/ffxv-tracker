import { RESPONSE_SIDE_QUESTS, RESPONSE_HUNTS } from '../constants/ActionTypes';
import { receiveSideQuests, requestSideQuests } from './quests';
import { receiveHunts, requestHunts } from './hunts';

const receiveGeneratedData = (status, json) => (dispatch) => {
  dispatch(receiveSideQuests(status, json.sideQuests))
  dispatch(receiveHunts(status, json.hunts))
}

export const fetchGeneratedData = () => (dispatch) => {

  // Inform the app we start the request
  dispatch(requestSideQuests())
  dispatch(requestHunts())

  return fetch('./data-generated.json')
    .then(response => response.json())
    .then(json => dispatch(receiveGeneratedData('success', json)))
    .catch(err => dispatch(receiveGeneratedData('error', err)))
}