import axios from 'axios';
import toast from '../configs/toast';
export const SET_JOB_DATA = 'SET_JOB_DATA';
export const OPEN_JOB_POST = 'OPEN_JOB_POST';
export const CLOSE_JOB_POST = 'CLOSE_JOB_POST';
export const CREATED_JOBS = 'CREATED_JOBS';
export const SET_APPLIED_JOBS = 'SET_APPLIED_JOBS';
export const SET_RECEIVED_JOB_APPLICATIONS = 'SET_RECEIVED_JOB_APPLICATIONS';

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
    let attachment = data.attachment;
    let application = {
            name : data.name,
            email: data.email,
            message: data.message,
            attachment: "",
            jobId : data.jobId,
            createdBy: data.createdBy,
            appliedBy: data.appliedBy,
            applicants: Number(data.applicants),
            jobTitle : data.jobTitle
    };
    return (dispatch) => {
        axios.post('/job/apply',
        application, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch(saveJobAttachment(
                    {applicationId : res.data.data._id, 
                     attachment : attachment}));
            }else{
                if(res.data.message){
                    toast.error(res.data.message,
                    {autoClose:2500, hideProgressBar: true})
                }
            }
          
        });
    }
}

const saveJobAttachment = (attachmentData) => {
    if(attachmentData){
        return (dispatch) => {
            const formData = new FormData();
            formData.append('applicationId', attachmentData.applicationId)
            formData.append('attachment', attachmentData.attachment);

             axios.post('/job/application-attachment',
             formData, {
                'withCredentials': true,
                'credentials': "same-origin",
                'Content-Type': 'multipart/form-data',
              })
              .then((res) => {
                  console.log('apply res : ', res)
                  if(res.data && res.data.result){
                    toast.success('Applied to the job successfully!',
                    {autoClose:2500, hideProgressBar: true})
                    window.location.href = "http://localhost:3000/home";
                  }
              })
          
        }
    }
    
}

const getAppliedJobs = (user) => {
    if(user){
        return (dispatch) => {
            axios.post('/job/applied-jobs',
            user, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res && res.data.sucess){
                    dispatch({
                        type: SET_APPLIED_JOBS,
                        jobs : res.data.result
                    })
    
                }
              
            });
        }
    }
}

const getRecivedJobs = (user) => {
    if(user){
        return (dispatch) => {
            axios.post('/job/recived-jobs',
            user, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res && res.data.sucess){
                    dispatch({
                        type: SET_RECEIVED_JOB_APPLICATIONS,
                        jobs : res.data.result
                    })
    
                }
              
            });
        }
    }
}


export  {
    createJob,
    openJobPost,
    searchJobs,
    closeJobPost,
    sendJobApplication,
    getJobs,
    deleteJobById,
    applyJob,
    getAppliedJobs,
    getRecivedJobs
}