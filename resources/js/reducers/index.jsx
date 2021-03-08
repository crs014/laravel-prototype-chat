import { combineReducers } from 'redux';
import chatReducers from './chatReducers';
import userReducers from './userReducer';

export default combineReducers({
    chats : chatReducers,
    users : userReducers
});