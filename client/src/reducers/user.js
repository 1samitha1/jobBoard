import {
    SET_CURRENT_USER,
    SET_SEEKERS_AND_PROVIDERS

} from '../actions/user';

const user = ( state = {
    currentUser : {},
    users : []

}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER :
            return Object.assign({}, state, {
                currentUser : action.user
            });

        case SET_SEEKERS_AND_PROVIDERS :   
            return Object.assign({}, state, {
                users : action.users
            });

        default:
            return state;
    }
};

export default user;