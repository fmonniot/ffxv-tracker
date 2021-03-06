import merge from 'lodash/merge'
import find from 'lodash/find'

import { COMPLETE_HUNT, HUNT_SORT, HUNT_FILTER, RESPONSE_HUNTS } from '../constants/ActionTypes';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/Filters';
import { SORT_NAME, SORT_REGION, SORT_LEVEL, SORT_LOCATION } from '../constants/Filters';
import { V_HUNTS } from '../constants/Config'
import { updateVersion } from '../actions/system'

// TODO Have an object with {quests, filter, sort}
const initialState = {
  items: [],
  filter: SHOW_ALL,
  sort: SORT_NAME
};

export default function hunts(state = initialState, action) {
  switch (action.type) {
  case RESPONSE_HUNTS:
    if(action.status === 'success') {
      const items = action.hunts.map((item) => {
        return merge({}, find(state.items, {'id': item.id}), item)
      })

      action.asyncDispatch(updateVersion(V_HUNTS, action.version))
      return Object.assign({}, state, { items, error: undefined });
    } else {
      return Object.assign({}, state, {error: action.error});
    }

  case COMPLETE_HUNT:
    const completedHunts = state.items.map(hunt =>
      hunt.id === action.id
          ? Object.assign({}, hunt, { completed: !hunt.completed })
          : hunt
    );

    return Object.assign({}, state, {items: completedHunts});

  case HUNT_FILTER:
    return Object.assign({}, state, {filter: action.filter})

  case HUNT_SORT:
    return Object.assign({}, state, {sort: action.sort})

  default:
    return state;
  }
}
