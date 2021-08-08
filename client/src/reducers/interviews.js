//
import {
    SET_COMPANY_INTERVIEWS,

} from '../actions/interview';

const interviews = ( state = {
    companyInterviews : [],
    

}, action) => {
    switch (action.type) {
        case SET_COMPANY_INTERVIEWS :
            return {
                ...state,
                companyInterviews : action.interviews
            }

          

        default:
            return state;
    }
};

export default interviews;