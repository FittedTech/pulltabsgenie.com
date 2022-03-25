import { combineReducers } from 'redux';
import { wizardReducer } from './wizardReducer';
import { userReducer } from './userReducer';

export default combineReducers({
    wizard: wizardReducer,
    user: userReducer
});