import axios from 'axios';
import toast from '../configs/toast';
import {getJobOffers} from './user'
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

const rejectJobOffers = (data) => {
    return (dispatch) => {
        axios.post('/candidate/reject-offers',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           if(res && res.data.success){
                dispatch(getJobOffers({candidateId: data.candidateId}))
           }
        });
    }
}



export  {
    searchCandidates,
    setCandidateToMiniProfile,
    rejectJobOffers
}