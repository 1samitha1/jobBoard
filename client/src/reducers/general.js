import {
    DISPLAY,


} from '../actions/general';

const general = ( state = {
    displayElm : "home"

}, action) => {
    switch (action.type) {
        case DISPLAY :
            return Object.assign({}, state, {
                displayElm : action.val
            });

        default:
            return state;
    }
};

export default general;