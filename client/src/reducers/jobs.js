import {
    SET_JOB_DATA,

} from '../actions/jobs';

const jobs = ( state = {
    jobArray : [],
    jobCount : 0

}, action) => {
    switch (action.type) {
        case SET_JOB_DATA :
            return Object.assign({}, state, {
                jobArray : action.data,
                jobCount : action.data.length
            });

        default:
            return state;
    }
};

export default jobs;