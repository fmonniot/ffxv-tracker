import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import quests from './quests'
import drawer from './drawer'
import hunts from './hunts'

const rootReducer = combineReducers({
    quests,
    drawer,
    hunts,
    routing: routerReducer
})

export default rootReducer
