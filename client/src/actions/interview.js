import axios from 'axios';
import toast from '../configs/toast';
import {setDisplay} from './general';

export const SET_COMPANY_INTERVIEWS = 'SET_COMPANY_INTERVIEWS';

const createInterview = (data) => {
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

const getInterviewsForCompany = (data) => {
    return (dispatch) => {
        if(data){
            axios.post('/interview/get-company',
            data, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res.data && res.data.success){
                    dispatch({
                        type : SET_COMPANY_INTERVIEWS,
                        interviews : res.data.data
                    })
                }
            }); 
        }
        
    }
}


export  {
    createInterview,
    getInterviewsForCompany
}