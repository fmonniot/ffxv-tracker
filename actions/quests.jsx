import * as types from '../constants/ActionTypes';

// Complete toggle and Reset

export function completeQuest(id) {
  return { type: types.COMPLETE_QUEST, id };
}

// UI

export function sortQuests(sort) {
  return { type: types.QUEST_SORT, sort };
}

export function filterQuests(filter) {
  return { type: types.QUEST_FILTER, filter };
}

// Network

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

export const receiveSideQuests = (status, json, version) => (dispatch) => {
  const action = { type: types.RESPONSE_SIDE_QUESTS, status, receivedAt: Date.now(), version }

  if(status === "success") {
    dispatch(Object.assign(action, {quests: json.map(e => Object.assign(e, {id: slugify(e.name)}))}))
  } else {
    dispatch(Object.assign(action, {error: json}))
  }
}
