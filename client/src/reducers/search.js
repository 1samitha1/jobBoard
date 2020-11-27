import {
    SET_SEARCH_CRITERIA,


} from '../actions/search';

const search = ( state = {
    keyword : "",
    industry : "",
    jobType : ""

}, action) => {
    switch (action.type) {
        case SET_SEARCH_CRITERIA :
            return Object.assign({}, state, {
                keyword : action.values.keyword
            });

          

        default:
            return state;
    }
};

export default search;