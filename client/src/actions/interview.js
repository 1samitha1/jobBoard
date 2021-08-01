import axios from 'axios';
import toast from '../configs/toast';

import {setDisplay} from './general';

const createInterview = (data) => {
    console.log('createInterview : ', data)
    return (dispatch) => {
        axios.post('/interview/create',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                toast.success("Interview Scheduled Successfully!",
                    {autoClose:3000, hideProgressBar: true})

                dispatch(setDisplay('job_applications'))    
            }
          
        });
    }
}


export  {
    createInterview
}