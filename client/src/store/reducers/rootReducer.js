import { combineReducers } from 'redux'
import { infoReducer } from './info'
import { userReducer } from './user'

export const rootReducer = combineReducers({
    info: infoReducer,
    user: userReducer
})
