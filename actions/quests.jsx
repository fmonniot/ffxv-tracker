import * as types from '../constants/ActionTypes';

export function completeQuest(id) {
  return { type: types.COMPLETE_QUEST, id };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}

export function syncQuests() {
  return { type: types.SYNC_QUESTS };
}

export function sortQuests(sort) {
  return { type: 'QUEST_SORT', sort };
}

export function filterQuests(filter) {
  return { type: 'QUEST_FILTER', filter };
}