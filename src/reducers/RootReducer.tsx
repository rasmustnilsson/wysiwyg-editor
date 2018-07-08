import { combineReducers } from 'redux';
import textReducer from './TextReducer';
import OutputReducer from './OutputReducer';

export default combineReducers({
    textReducer,
    OutputReducer
});