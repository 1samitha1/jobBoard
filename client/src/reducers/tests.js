import {
    STORE_CREATED_TESTS,
    SEND_CANDIDATE_FOR_TEST,
    STORE_RECIVED_TESTS,
    SET_SELECTED_TEST,
    STORE_TEST_RESULTS

} from '../actions/tests';

const tests = ( state = {
    tests : [],
    candidateForTest :"",
    receivedTests : [],
    setectedTest : {},
    testResults : []

}, action) => {
    switch (action.type) {
        case STORE_CREATED_TESTS :
            return {
                ...state,
                tests : action.data
            }

        case SEND_CANDIDATE_FOR_TEST :    
            return {
                ...state,
                candidateForTest : action.id
            }

        case STORE_RECIVED_TESTS : 
            return {
                ...state,
                receivedTests : action.data
            } 
            
        case SET_SELECTED_TEST :   
            return {
                ...state,
                setectedTest : action.data
            } 
        case STORE_TEST_RESULTS : 
            return {
                ...state,
                testResults : action.data
            }     

        default:
            return state;
    }
};

export default tests;