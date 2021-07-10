import {
    SHOW_HIDE_NOTIFICATIONS_WRAPPER,
    HANDLE_POPUP_VISIBILITY,
    SET_USER_NOTIFICATIONS

} from '../actions/notifications';

const notification = ( state = {
    displayNotificationWrapper : false,
    displayPopup : false,
    userNotifications : []

}, action) => {
    switch (action.type) {
        case SHOW_HIDE_NOTIFICATIONS_WRAPPER :
            return Object.assign({}, state, {
                displayNotificationWrapper : !state.displayNotificationWrapper
            });
        case HANDLE_POPUP_VISIBILITY :
            return {
                ...state,
                displayPopup : action.visibility
            }
         
        case SET_USER_NOTIFICATIONS :    
            return {
                ...state,
                userNotifications : action.notifications
            }
            
        default:
            return state;
    }
};

export default notification;