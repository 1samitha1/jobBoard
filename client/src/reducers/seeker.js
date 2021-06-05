import { object } from 'prop-types';
import {
    SET_CANDIDATE_DATA,
    SET_CANDIDATE_TO_MINI_PROFILE
    // CLOSE_JOB_POST

} from '../actions/seeker';

const seeker = ( state = {
    candidateArray : [],
    candidateCount : 0,
    miniprofileCandidate : {},
    // openJobPost : false

}, action) => {
    switch (action.type) {
        case SET_CANDIDATE_DATA :
            return Object.assign({}, state, {
                candidateArray : action.data,
                candidateCount : action.data.length
            });
         
        case SET_CANDIDATE_TO_MINI_PROFILE : 
            return {
                ...state,
                miniprofileCandidate : action.candidate
            }    

        // case OPEN_JOB_POST :
        //     return Object.assign({}, state, {
        //         openJobPost : true,
        //         jobToOpen : action.jobPost
        //     });
            
        // case CLOSE_JOB_POST :
        //     return Object.assign({}, state, {
        //         openJobPost : false,
        //         jobToOpen : {}
        //     });     

        default:
            return state;
    }
};

export default seeker;