import {
    SET_CURRENT_USER,
    SET_SEEKERS_AND_PROVIDERS,
    SET_SEEKER_BOOKMARKS,
    SET_JOB_OFFERS

} from '../actions/user';

const user = ( state = {
    currentUser : {},
    users : [],
    seekerBookmarks : [],
    jobOffers : []

}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER :
            return Object.assign({}, state, {
                currentUser : action.user
            });

        case SET_SEEKERS_AND_PROVIDERS :   
            return Object.assign({}, state, {
                users : action.users
            });

        case SET_SEEKER_BOOKMARKS :
            return {
                ...state,
                seekerBookmarks : action.bookmarks
            }     
            
        case SET_JOB_OFFERS : 
            return { 
                ...state,
                jobOffers : action.data
            }    

        default:
            return state;
    }
};

export default user;