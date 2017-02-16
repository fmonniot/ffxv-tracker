import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';

export const router = routerMiddleware(browserHistory)
export const thunk = thunkMiddleware