import Perf from 'react-addons-perf'
import merge from 'lodash/merge'
import find from 'lodash/find'

import { COMPLETE_QUEST, QUEST_SORT, QUEST_FILTER, RESPONSE_SIDE_QUESTS } from '../constants/ActionTypes'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/Filters'
import { SORT_NAME, SORT_REGION, SORT_LEVEL, SORT_LOCATION } from '../constants/Filters'

// TODO Have an object with {quests, filter, sort}
const initialState = {
  items: [],
  filter: SHOW_ALL,
  sort: SORT_NAME
};

let lastLocPayload = {pathname: 'none'}

export default function quests(state = initialState, action) {
  switch (action.type) {
  case RESPONSE_SIDE_QUESTS:
    if(action.status === 'success') {
      const items = action.quests.map((item) => {
        return merge({}, find(state.items, {'id': item.id}), item)
      })

      return Object.assign({}, state, { items });
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

  case '@@router/LOCATION_CHANGE':
    const locPayload = action.payload
    console.log(`Location changed. Printing performance from ${lastLocPayload.pathname} to ${locPayload.pathname}.`)
    Perf.stop()
    
    const measurements = Perf.getLastMeasurements()
    Perf.printInclusive(measurements)
    Perf.printExclusive(measurements)
    Perf.printWasted(measurements)

    console.log(`Collecting performance from ${locPayload.pathname} to next location change.`)
    Perf.start()

  default:
    return state;
  }
}
