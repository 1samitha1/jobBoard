import {
    STORE_CREATED_TESTS


} from '../actions/tests';

const tests = ( state = {
    tests : []

}, action) => {
    switch (action.type) {
        case STORE_CREATED_TESTS :
            return {
                ...state,
                tests : action.data
            }

        default:
            return state;
    }
};

export default tests;