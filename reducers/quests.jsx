import { COMPLETE_QUEST, QUEST_SORT, QUEST_FILTER, RESPONSE_SIDE_QUESTS } from '../constants/ActionTypes';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/Filters';
import { SORT_NAME, SORT_REGION, SORT_LEVEL, SORT_LOCATION } from '../constants/Filters';

// TODO Have an object with {quests, filter, sort}
const initialState = {
  items: [],
  filter: SHOW_ALL,
  sort: SORT_NAME
};

export default function quests(state = initialState, action) {
  switch (action.type) {
  case RESPONSE_SIDE_QUESTS:
    if(action.status === 'success') {
      return Object.assign({}, state, {items: action.quests});
    } else {
      return Object.assign({}, state, {error: action.error});
    }

  case COMPLETE_QUEST:
    const completedQuests = state.items.map(quest =>
      quest.id === action.id
          ? Object.assign({}, quest, { completed: !quest.completed })
          : quest
    );

    return Object.assign({}, state, {items: completedQuests});

  case QUEST_FILTER:
    return Object.assign({}, state, {filter: action.filter})

  case QUEST_SORT:
    return Object.assign({}, state, {sort: action.sort})

  default:
    return state;
  }
}
