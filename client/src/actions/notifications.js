import axios from 'axios';
import toast from '../configs/toast';
export const SHOW_HIDE_NOTIFICATIONS_WRAPPER = 'SHOW_NOTIFICATIONS_WRAPPER';
export const HANDLE_POPUP_VISIBILITY = 'HANDLE_POPUP_VISIBILITY';
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';


const showNotificationWrapper = () => {
    return {
        type : SHOW_HIDE_NOTIFICATIONS_WRAPPER
    }
};

const closeNotificationWrapper = () => {
    return {
        type : SHOW_HIDE_NOTIFICATIONS_WRAPPER
    }
};

const closePopup = () => {
    return{
        type: HANDLE_POPUP_VISIBILITY,
        visibility: false
    }

}

const openPopup = () => {
    console.log('openPopup')
    return{
        type: HANDLE_POPUP_VISIBILITY,
        visibility: true
    }
}

const getNotificationsByUser = (data) => {
    console.log('SET_USER_NOTIFICATIONS 1 : ',data)
    return (dispatch) => {
        axios.post('/notification/get',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                console.log('SET_USER_NOTIFICATIONS 2 : ', res.data.data)
                dispatch({
                    type : SET_USER_NOTIFICATIONS,
                    notifications : res.data.data
                })
            }
          
        });
    }
}

const updateNotificationStatus = (data) => {
    return (dispatch) => {
        axios.post('/notification/update',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            
          
        });
    }
}

export  {
    showNotificationWrapper,
    closeNotificationWrapper,
    closePopup,
    openPopup,
    getNotificationsByUser,
    updateNotificationStatus
}