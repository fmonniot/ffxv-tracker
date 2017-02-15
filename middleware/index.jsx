import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';

export const router = routerMiddleware(browserHistory)