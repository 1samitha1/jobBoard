import {
    DISPLAY,
    PREVIOUS_PAGE,
    ALL_LOCATIONS,
    ALL_INDUSTRIES,
    ALL_SALARIES

} from '../actions/general';

const general = ( state = {
    displayElm : "home",
    prevPage : "",
    locations : [],
    industries : [],
    salaries : []

}, action) => {
    switch (action.type) {
        case DISPLAY :
            return Object.assign({}, state, {
                displayElm : action.val
            });

        case PREVIOUS_PAGE :
            return {
                ...state,
                prevPage : action.page
            }
        
        case ALL_LOCATIONS :  
        return {
            ...state,
            locations : action.locations
        } 
        
        case ALL_INDUSTRIES :  
        return {
            ...state,
            industries : action.industries
        } 

        case ALL_SALARIES :  
        return {
            ...state,
            salaries : action.salaries
        }

        default:
            return state;
    }
};

export default general;