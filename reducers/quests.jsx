import { COMPLETE_QUEST, CLEAR_COMPLETED, QUEST_SORT, QUEST_FILTER } from '../constants/ActionTypes';
import { RESPONSE_SIDE_QUESTS } from '../constants/ActionTypes';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/QuestFilters';
import { SORT_NAME, SORT_REGION, SORT_LEVEL, SORT_LOCATION } from '../constants/QuestFilters';

// TODO Have an object with {quests, filter, sort}
const initialState = {
  quests: [],
  filter: SHOW_ALL,
  sort: SORT_NAME
};

export default function quests(state = initialState, action) {
  switch (action.type) {
  case RESPONSE_SIDE_QUESTS:
    const json = action.quests

    if(action.status === 'success') {
      return Object.assign({}, state, {quests: json});
    } else {
      return Object.assign({}, state, {error: action.error});
    }

  case COMPLETE_QUEST:
    const completedQuests = state.quests.map(quest =>
      quest.id === action.id ?
        Object.assign({}, quest, { completed: !quest.completed }) :
        quest
    );

    return Object.assign({}, state, {quests: completedQuests});

  case CLEAR_COMPLETED:
    const clearedQuests = state.quests.filter(quest => quest.completed === false);

    return Object.assign({}, state, {quests: clearedQuests});

  case QUEST_FILTER:
    return Object.assign({}, state, {filter: action.filter})

  case QUEST_SORT:
    return Object.assign({}, state, {sort: action.sort})

  default:
    return state;
  }
}
