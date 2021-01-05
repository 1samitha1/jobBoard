import axios from 'axios';
import toast from '../configs/toast';
export const SET_JOB_DATA = 'SET_JOB_DATA';

const createJob = (jobData) => {
    return () => {
        axios.post('/job/create',
            jobData, {
            withCredentials: true,
            credentials: "same-origin", 
        }).then((res) => {
            
            if(res.data && res.data.success){
                toast.success('Job created successfully!',
                    {autoClose:2500, hideProgressBar: true})
            }else{
                toast.error('Error while creating the Job!',
                {autoClose:2500, hideProgressBar: true})
            }
        })
    }
};

const getJobs = (data) => {
    return (dispatch) => {

    }
    
};

const searchJobs = (criteria) => {
    return (dispatch) => {
        axios.post('/job/search',
            criteria, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            console.log("xxx search results : ", res.data.data)
           dispatch({
               type: SET_JOB_DATA,
               data : res.data.data
           })
        });
    }
};


export  {
    createJob,
    getJobs,
    searchJobs
}