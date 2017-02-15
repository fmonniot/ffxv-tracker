import { combineReducers } from 'redux';
import todos from './todos';
import drawer from './drawer';

const rootReducer = combineReducers({
    todos,
    drawer
});

export default rootReducer;
