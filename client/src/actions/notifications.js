 export const SHOW_HIDE_NOTIFICATIONS_WRAPPER = 'SHOW_NOTIFICATIONS_WRAPPER';
 export const HANDLE_POPUP_VISIBILITY = 'HANDLE_POPUP_VISIBILITY';


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



export  {
    showNotificationWrapper,
    closeNotificationWrapper,
    closePopup,
    openPopup
}