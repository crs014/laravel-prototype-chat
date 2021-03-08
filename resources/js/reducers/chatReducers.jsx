import { READ_CHAT_USER, SENDING_MESSAGE, UPDATE_MESSAGE } from '../actions/type';

export default (state = [], action) => {
    switch (action.type) {
        case READ_CHAT_USER :
            return action.payload;
        case SENDING_MESSAGE : 
            return [...state, action.payload];
        case UPDATE_MESSAGE :
            return [...state, action.payload];
        default :
            return state;
    }
};