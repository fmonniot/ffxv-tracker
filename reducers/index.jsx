import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import system from './system'
import quests from './quests'
import drawer from './drawer'
import hunts from './hunts'

const rootReducer = combineReducers({
    system,
    quests,
    drawer,
    hunts,
    routing: routerReducer
})

export default rootReducer
