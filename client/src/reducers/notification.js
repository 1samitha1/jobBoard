import {
    SHOW_HIDE_NOTIFICATIONS_WRAPPER,


} from '../actions/notifications';

const notification = ( state = {
    displayNotificationWrapper : false

}, action) => {
    switch (action.type) {
        case SHOW_HIDE_NOTIFICATIONS_WRAPPER :
            return Object.assign({}, state, {
                displayNotificationWrapper : !state.displayNotificationWrapper
            });

          

        default:
            return state;
    }
};

export default notification;