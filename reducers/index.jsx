import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import quests from './quests';
import drawer from './drawer';

const rootReducer = combineReducers({
    quests,
    drawer,
    routing: routerReducer
});

export default rootReducer;
