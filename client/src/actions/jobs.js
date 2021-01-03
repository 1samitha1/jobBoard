
import axios from 'axios';
import toast from '../configs/toast';
// export const OPEN_REGISTER_COMPONENT = 'OPEN_REGISTER_COMPONENT';

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


export  {
    createJob
}