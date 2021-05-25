import {
    DISPLAY_OVERLAY,
    SET_PAGE
} from '../actions/admin';

const admin = ( state = {
    showOverlay : false,
    page : ""

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

        default:
            return state;
    }
};

export default admin;