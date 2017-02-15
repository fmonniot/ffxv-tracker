import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import todos from './todos';
import drawer from './drawer';

const rootReducer = combineReducers({
    todos,
    drawer,
    routing: routerReducer
});

export default rootReducer;
