import { SYNC_QUESTS, COMPLETE_QUEST, CLEAR_COMPLETED } from '../constants/ActionTypes';

// TODO Have an object with {quests, filter, sort}
const initialState = [{
  completed: false,
  id: 0,
  name: 'Use Redux',
  level: 0,
  chapter: 6,
  location: 'Galdin Quay',
  rewards: `5,000 EXP
1 Leiden Sweet Potato
1 Fine Cleigne Wheat
1 Ulwaat Berries
3,000 gil
New Food Sold`
}];

export default function quests(state = initialState, action) {
  switch (action.type) {
  case SYNC_QUESTS:
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text
    }, ...state];

  case COMPLETE_QUEST:
    return state.map(quest =>
      quest.id === action.id ?
        Object.assign({}, quest, { completed: !quest.completed }) :
        quest
    );

  case CLEAR_COMPLETED:
    return state.filter(todo => todo.completed === false);

  default:
    return state;
  }
}
