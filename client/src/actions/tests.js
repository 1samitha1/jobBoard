import axios from 'axios';
import toast from '../configs/toast';
import {setDisplay} from './general';
export const STORE_CREATED_TESTS = 'STORE_CREATED_TESTS';
export const SEND_CANDIDATE_FOR_TEST = 'SEND_CANDIDATE_FOR_TEST';
export const STORE_RECIVED_TESTS = 'STORE_RECIVED_TESTS';
export const SET_SELECTED_TEST = 'SET_SELECTED_TEST';
export const STORE_TEST_RESULTS = 'STORE_TEST_RESULTS';


const createTest = (values) => {
    return (dispatch) => {
        axios.post('/test/create',
        values, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.error){
                toast.error('error while creating the job!',
                {autoClose:2500, hideProgressBar: true})
            }else{
                toast.success('Test created successfully!',
                {autoClose:2500, hideProgressBar: true})
                dispatch(setDisplay("tests_portal"));
            }
            
        });
    }
};

const getTestsByUser = (data) => {
    console.log('vvvvgetTestsByUser : ', data)
    return (dispatch) => {
        axios.post('/test/get_by_user',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            console.log('res.data.data : ', res.data.data)
           dispatch({
                type: STORE_CREATED_TESTS,
                data : res.data.data
            })
        });
    }
}

const deleteSelectedTest = (data) => {
    return (dispatch) => {
        axios.post('/test/delete-test',
        {id :data.id}, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                toast.success('Selected Test deleted successfully!',
                {autoClose:2500, hideProgressBar: true});
                dispatch(getTestsByUser({id : data.createdBy}));
            }
        });
    }
}

const testSkills = (data) => {
    return (dispatch) => {
        axios.post('/test/skill-test',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch({
                    type : SEND_CANDIDATE_FOR_TEST,
                    id : ""
                });
                toast.success('Selected Test sent successfully!',
                {autoClose:2500, hideProgressBar: true});
                dispatch(setDisplay("job_applications"));
            }else if(res.data.success === false){
                toast.error(res.data.msg,
                {autoClose:2500, hideProgressBar: true})
            }
        });
    }
}

const setCandidateForTest = (id) => {
    return {
        type: SEND_CANDIDATE_FOR_TEST,
        id: id
    }
}

const getRecivedTest = (data) => {
    return (dispatch) => {
        axios.post('/test/recived-tests',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch({
                    type : STORE_RECIVED_TESTS,
                    data : res.data.result
                })
               
            }
        });
    }
}

const setSelectedTest = (data) => {
    return {
        type: SET_SELECTED_TEST,
        data: data
    }
}

const saveTestResult = (data) => {
    return (dispatch) => {
        axios.post('/test/test-results',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            
        });
    }
}

const getTestResultsByUser = (data) => {
    return (dispatch) => {
        axios.post('/test/get-test-results',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                dispatch({
                    type : STORE_TEST_RESULTS,
                    data : res.data.result
                })
               
            }
        });
    }
}

const clearTestResult = (data) => {
    return (dispatch) => {
        axios.post('/test/clear-test-results',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res.data.success){
                getTestResultsByUser({companyId : data.companyId});
            }
        });
    }
}


export  {
    createTest,
    getTestsByUser,
    deleteSelectedTest,
    testSkills,
    setCandidateForTest,
    getRecivedTest,
    setSelectedTest,
    saveTestResult,
    getTestResultsByUser,
    clearTestResult
    
}