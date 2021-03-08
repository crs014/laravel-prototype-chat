import { USER_LIST } from '../actions/type';

export default (state = [], action) => {
    switch (action.type) {
        case USER_LIST :
            return action.payload;
        default :
            return state;
    }
};