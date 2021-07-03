import {
    DISPLAY,
    PREVIOUS_PAGE

} from '../actions/general';

const general = ( state = {
    displayElm : "home",
    prevPage : ""

}, action) => {
    switch (action.type) {
        case DISPLAY :
            return Object.assign({}, state, {
                displayElm : action.val
            });

        case PREVIOUS_PAGE :
            return {
                ...state,
                prevPage : action.page
            } 

        default:
            return state;
    }
};

export default general;