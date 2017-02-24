import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import asyncDispatchMiddleware from './asyncDispatchMiddleware'


export const router = routerMiddleware(hashHistory)
export const thunk = thunkMiddleware
export const asyncDispatch = asyncDispatchMiddleware