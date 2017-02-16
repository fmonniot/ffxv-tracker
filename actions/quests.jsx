import * as types from '../constants/ActionTypes';

export function completeQuest(id) {
  return { type: types.COMPLETE_QUEST, id };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}

export function sortQuests(sort) {
  return { type: types.QUEST_SORT, sort };
}

export function filterQuests(filter) {
  return { type: types.QUEST_FILTER, filter };
}

export function requestSideQuests() {
  return { type: types.REQUEST_SIDE_QUESTS }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function receiveSideQuests(status, json) {
  const action = { type: types.RESPONSE_SIDE_QUESTS, status, receivedAt: Date.now() }

  if(status === "success") {
    return Object.assign(action, {quests: json.map(e => Object.assign(e, {id: slugify(e.name)}))})
  } else {
    return Object.assign(action, {error: json})
  }
}

export const fetchSideQuests = () => (dispatch) => {

  // Inform the app we start the request
  dispatch(requestSideQuests())

  return fetch('./side-quests.json')
    .then(response => response.json())
    .then(json => dispatch(receiveSideQuests('success', json)))
    .catch(err => dispatch(receiveSideQuests('error', err)))
}
