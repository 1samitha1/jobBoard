import {
    SHOW_HIDE_NOTIFICATIONS_WRAPPER,
    HANDLE_POPUP_VISIBILITY


} from '../actions/notifications';

const notification = ( state = {
    displayNotificationWrapper : false,
    displayPopup : false

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
          
        default:
            return state;
    }
};

export default notification;