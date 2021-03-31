import axios from 'axios';
import toast from '../configs/toast';
export const SET_CANDIDATE_DATA = 'SET_CANDIDATE_DATA';

const searchCandidates = (criteria) => {
    criteria.userType = "seeker";
    return (dispatch) => {
        axios.post('/candidate/search',
            criteria, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            console.log('vvvvvv seekers ', res.data.data)
           dispatch({
               type: SET_CANDIDATE_DATA,
               data : res.data.data
           })
        });
    }
};

export  {
    searchCandidates,
}