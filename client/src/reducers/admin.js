import {
    DISPLAY_OVERLAY,
    SET_PAGE,
    SET_ADMIN_DATA,
    GET_ADMINS
} from '../actions/admin';

const admin = ( state = {
    showOverlay : false,
    page : "",
    adminData : {},
    admins : []

}, action) => {
    switch (action.type) {
        case DISPLAY_OVERLAY :
            return {
                ...state,
                showOverlay : !state.showOverlay
            }

        case SET_PAGE :    
            return {
                ...state,
                page : action.page
            }

        case SET_ADMIN_DATA :    
            return {
                ...state,
                adminData : action.data
            } 
           
        case GET_ADMINS :    
            return {
                ...state,
                admins : action.admins
            } 

        default:
            return state;
    }
};

export default admin;