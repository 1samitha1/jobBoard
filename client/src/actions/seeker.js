import axios from 'axios';
import toast from '../configs/toast';
export const SET_CANDIDATE_DATA = 'SET_CANDIDATE_DATA';
export const SET_CANDIDATE_TO_MINI_PROFILE = 'SET_CANDIDATE_TO_MINI_PROFILE';

const searchCandidates = (criteria) => {
    criteria.userType = "seeker";
    return (dispatch) => {
        axios.post('/candidate/search',
            criteria, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           dispatch({
               type: SET_CANDIDATE_DATA,
               data : res.data.data
           })
        });
    }
};

const setCandidateToMiniProfile = (candidate) => {
    return{
        type:SET_CANDIDATE_TO_MINI_PROFILE,
        candidate:candidate
    }
};



export  {
    searchCandidates,
    setCandidateToMiniProfile
}