import { READ_CHAT_USER, SENDING_MESSAGE, UPDATE_MESSAGE } from './type';
import api from '../api';
import ws from '../webSocket';

export const readChatUser = id => async dispatch => {

    let response = await api.get(`/messager/user-chat/${id}`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
    
    dispatch({ type : READ_CHAT_USER, payload : response.data.data });
};

export const sendingMessage = item => async dispatch => {
    let response = await api.post(`/messager/sending`, {
        user_id : item.user_id,
        content : item.content
    } ,
    {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    dispatch({ type : SENDING_MESSAGE, payload : response.data.data });
};

export const updateMessage = user_id => async dispatch => {
    let response = await api.get('/user/self', {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });

    ws.leave(`PrivateChat.${response.data.data.id}`);

    ws.join(`PrivateChat.${response.data.data.id}`)
    .listen('.WSPrivateChat', (data) => {
        if(user_id === data.data.sender) {  
            dispatch({ type : UPDATE_MESSAGE, payload: data.data });
        }
    },(e) => {
        console.log(e);
    });
};