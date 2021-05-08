import {

    SET_CURRENT_USER

} from '../actions/user';

const user = ( state = {
    currentUser : {}

}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER :
            return Object.assign({}, state, {
                currentUser : action.user
            });

        default:
            return state;
    }
};

export default user;