import axios from 'axios';
import toast from '../configs/toast';
export const SET_JOB_DATA = 'SET_JOB_DATA';
export const OPEN_JOB_POST = 'OPEN_JOB_POST';
export const CLOSE_JOB_POST = 'CLOSE_JOB_POST';
export const CREATED_JOBS = 'CREATED_JOBS';

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

const openJobPost = (jobData) => {
    return {
        type: OPEN_JOB_POST,
        jobPost: jobData
    }
};

const searchJobs = (criteria) => {
    return (dispatch) => {
        axios.post('/job/search',
            criteria, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           dispatch({
               type: SET_JOB_DATA,
               data : res.data.data
           })
        });
    }
};

const closeJobPost = () => {
    return {
        type: CLOSE_JOB_POST
    }
}

const sendJobApplication = (data) => {
    return (dispatch) => {
        axios.post('/job/sendJobApplication',
            data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
        //    dispatch({
        //        type: SET_JOB_DATA,
        //        data : res.data.data
        //    })
        });
    }
}

const getJobs = (data) => {
    return (dispatch) => {
        axios.post('/job/get',
            data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           dispatch({
               type: CREATED_JOBS,
               createdJobs : res.data.data
           })
        });
    }
};

const deleteJobById = (data) => {
    console.log('vvvv deleteJobById : ', deleteJobById)
    return (dispatch) => {
        axios.post('/job/delete',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           dispatch({
               type: CREATED_JOBS,
               createdJobs : res.data.data
           })
        });
    }
};

const applyJob = (data) => {
    return (dispatch) => {
        axios.post('/job/apply',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
          
        });
    }
}

const saveJobAttachment = (file) => {
    
}


export  {
    createJob,
    openJobPost,
    searchJobs,
    closeJobPost,
    sendJobApplication,
    getJobs,
    deleteJobById,
    applyJob
}