import * as types from '../constants/ActionTypes';

// Complete toggle and Reset

export function completeHunt(id) {
  return { type: types.COMPLETE_HUNT, id };
}

// UI

export function sortHunts(sort) {
  return { type: types.HUNT_SORT, sort };
}

export function filterHunts(filter) {
  return { type: types.HUNT_FILTER, filter };
}

// Network

export function requestHunts() {
  return { type: types.REQUEST_HUNTS }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function receiveHunts(status, json) {
  const action = { type: types.RESPONSE_HUNTS, status, receivedAt: Date.now() }

  if(status === "success") {
    return Object.assign(action, {hunts: json.map(e => Object.assign(e, {id: slugify(e.name)}))})
  } else {
    return Object.assign(action, {error: json})
  }
}
