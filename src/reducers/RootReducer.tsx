import { combineReducers } from 'redux'
import textReducer from './TextReducer'
import PageReducer from './PageReducer'

export default combineReducers({
    textReducer,
    PageReducer,
})