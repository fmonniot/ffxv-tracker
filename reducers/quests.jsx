import { SYNC_QUESTS, COMPLETE_QUEST, CLEAR_COMPLETED, QUEST_SORT, QUEST_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/QuestFilters';
import { SORT_NAME, SORT_REGION, SORT_LEVEL, SORT_LOCATION } from '../constants/QuestFilters';

// TODO Have an object with {quests, filter, sort}
const initialState = {
  quests: [
    {
      completed: false,
      id: 0,
      name: 'Berried Memories',
      level: 2,
      chapter: 6,
      location: 'Galdin Quay',
      rewards: [
        '5,000 EXP',
        '1 Leiden Sweet Potato',
        '1 Fine Cleigne Wheat',
        '1 Ulwaat Berries',
        '3,000 gil',
        'New Food Sold'
      ]
    },
    {
      completed: false,
      id: 1,
      name: 'Use Redux',
      level: 10,
      chapter: 6,
      location: 'Galdin Quay',
      rewards: [
        '5,000 EXP',
        '1 Leiden Sweet Potato',
        '1 Fine Cleigne Wheat',
        '1 Ulwaat Berries',
        '3,000 gil',
        'New Food Sold'
      ]
    },
    {
      completed: false,
      id: 3,
      name: 'Use Redux 2',
      level: 5,
      chapter: 6,
      location: 'Galdin Quay',
      rewards: [
        '5,000 EXP',
        '1 Leiden Sweet Potato',
        '1 Fine Cleigne Wheat',
        '1 Ulwaat Berries',
        '3,000 gil',
        'New Food Sold'
      ]
    },
    {
      completed: false,
      id: 2,
      name: 'Use Redux 3',
      level: 0,
      chapter: 6,
      location: 'Galdin Quay',
      rewards: [
        '5,000 EXP',
        '1 Leiden Sweet Potato',
        '1 Fine Cleigne Wheat',
        '1 Ulwaat Berries',
        '3,000 gil',
        'New Food Sold'
      ]
    }
  ],
  filter: SHOW_ALL,
  sort: SORT_NAME
};

export default function quests(state = initialState, action) {
  switch (action.type) {
  case SYNC_QUESTS:
    const syncedQuests = [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text
    }, ...state.quests];
    return Object.assign({}, state, {quests: syncedQuests});

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
