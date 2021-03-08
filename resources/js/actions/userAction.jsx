import { USER_LIST } from './type';
import api from '../api';

export const readUserList = id => async dispatch => {
    let response = await api.get('/user/list', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    dispatch({ type : USER_LIST, payload : response.data.data });
};
