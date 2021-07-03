import {
    SET_JOB_DATA,
    OPEN_JOB_POST,
    CLOSE_JOB_POST,
    CREATED_JOBS,
    SET_APPLIED_JOBS,
    SET_RECEIVED_JOB_APPLICATIONS

} from '../actions/jobs';

const jobs = ( state = {
    jobArray : [],
    jobCount : 0,
    jobToOpen : {},
    openJobPost : false,
    createdJobs : [],
    appliedJobs : [],
    receivedJobAppications : []

}, action) => {
    switch (action.type) {
        case SET_JOB_DATA :
            return Object.assign({}, state, {
                jobArray : action.data,
                jobCount : action.data.length
            });

        case OPEN_JOB_POST :
            return Object.assign({}, state, {
                openJobPost : true,
                jobToOpen : action.jobPost
            });
            
        case CLOSE_JOB_POST :
            return Object.assign({}, state, {
                openJobPost : false,
                jobToOpen : {}
            });  
            
        case CREATED_JOBS :  
            return Object.assign({}, state, {
                createdJobs : action.createdJobs
            });
            
        case SET_APPLIED_JOBS : 
        return {
            ...state,
            appliedJobs : action.jobs
        }   

        case SET_RECEIVED_JOB_APPLICATIONS :
        return {
            ...state,
            receivedJobAppications : action.applications
        }

        default:
            return state;
    }
};

export default jobs;