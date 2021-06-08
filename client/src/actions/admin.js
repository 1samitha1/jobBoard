import axios from 'axios';
import toast from '../configs/toast';
export const DISPLAY_OVERLAY = 'DISPLAY_OVERLAY';
export const SET_PAGE = 'SET_PAGE';

const displayOverlay = () => {
    return (dispatch) => {
        dispatch({
            type : DISPLAY_OVERLAY
        })
    }
};

const setDisplayPage = (page) => {
    return (dispatch) => {
        dispatch({
            type : SET_PAGE,
            page: page
        })
    }
};

const sendAdminInvitation = (data) => {
    return (dispatch) => {
        axios.post('/user/invite-admin',
        data, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res && res.data){
            if(res.data.success){
                toast.success(res.data.msg,
                    {autoClose:3000, hideProgressBar: true})
            }else{
                toast.error(res.data.msg,
                {autoClose:3000, hideProgressBar: true})
            }
            
        }   
        })
    }
    
};

const completeAdminRegistration = (data) => {
    return () => {
        axios.post('/user/complete-admin',
        data, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res && res.data){
            if(res.data.success){
                toast.success(res.data.msg,
                    {autoClose:3000, hideProgressBar: true})
                window.location.href = "http://localhost:3000/admin-login";    
            }else{
                toast.error(res.data.msg,
                {autoClose:3000, hideProgressBar: true})
            }
            
        }   
        })
    }
} 





export  {
    displayOverlay,
    setDisplayPage,
    sendAdminInvitation,
    completeAdminRegistration
    
}