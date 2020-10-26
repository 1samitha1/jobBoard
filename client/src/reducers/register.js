import {
    OPEN_REGISTER_COMPONENT,


} from '../actions/register';

const register = ( state = {
    displayRegisterComponent : false

}, action) => {
    switch (action.type) {
        case OPEN_REGISTER_COMPONENT :
            return Object.assign({}, state, {
                displayRegisterComponent : !state.displayRegisterComponent
            });

        default:
            return state;
    }
};

export default register;