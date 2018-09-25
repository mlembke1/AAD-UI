import { combineReducers } from 'redux'
import { auth } from './auth'
import { tools } from './tools'
import { reviews } from './reviews'

const rootReducer = combineReducers({ auth, reviews, tools })

export default rootReducer