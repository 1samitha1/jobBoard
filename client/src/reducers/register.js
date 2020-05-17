import {
    OPEN_REGISTER_COMPONENT,
    BACK_TO_LOGIN

} from '../actions/register';

const register = ( state = {
    displayRegisterComponent : false

}, action) => {
    switch (action.type) {
        case OPEN_REGISTER_COMPONENT :
            return Object.assign({}, state, {
                displayRegisterComponent : !state.displayRegisterComponent
            });

        case BACK_TO_LOGIN :
            return Object.assign({}, state, {
                displayRegisterComponent : false
            });

        default:
            return state;
    }
};

export default register;