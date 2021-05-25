import axios from 'axios';
import toast from '../configs/toast';
export const STORE_CREATED_TESTS = 'STORE_CREATED_TESTS';

const createTest = (values) => {
    return (dispatch) => {
        axios.post('/test/create',
        values, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.success){
                toast.success('Test created successfully!',
                {autoClose:2500, hideProgressBar: true})
            }else{
                toast.error('error while creating the job!',
                    {autoClose:2500, hideProgressBar: true})
            }
            
        });
    }
};

const getTestsByUser = (userId) => {
    return (dispatch) => {
        axios.post('/test/get_by_user',
        userId, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
           dispatch({
                type: STORE_CREATED_TESTS,
                data : res.data.data
            })
        });
    }
}





export  {
    createTest,
    getTestsByUser
    
}