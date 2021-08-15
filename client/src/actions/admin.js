import axios from 'axios';
import toast from '../configs/toast';
import {getAdminByToken, setToken} from '../helpers/jwtHandler';
export const DISPLAY_OVERLAY = 'DISPLAY_OVERLAY';
export const SET_PAGE = 'SET_PAGE';
export const SET_ADMIN_DATA = 'SET_ADMIN_DATA';
export const GET_ADMINS = 'GET_ADMINS';

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

const setAdminData = (data) => {
    console.log('nnnnn setAdminData : ', data)
    return (dispatch) => {
        dispatch({
            type : SET_ADMIN_DATA,
            data: data
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
                    {autoClose:3000, hideProgressBar: true});
            }else{
                toast.error(res.data.msg,
                {autoClose:3000, hideProgressBar: true});
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
            if(res.data.success && res.data.updated){
                toast.success("Profile Updated Sucessfully.",
                    {autoClose:3000, hideProgressBar: true})
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/admin-login"; 
                    },4000)
                   
            }else{
                toast.error(res.data.msg ? res.data.msg : "Something went wrong! Please try again",
                {autoClose:3000, hideProgressBar: true})
            }
            
        }   
        })
    }
} 

const getAdmins = (id) => {
    return (dispatch) => {
        axios.post('/user/admins',
        {exclude : id}, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
            if(res && res.data){
                if(res.data.success){
                    dispatch({
                        type : GET_ADMINS,
                        admins: res.data.result
                    }); 
                }
            }   
        })
    }
}

const getAdminDataById = (data) => {
        return (dispatch) => {
            axios.post('/user/admin-by-id',
            data, {
            withCredentials: true,
            credentials: "same-origin", 
        }).then((res) => {
            if(res && res.data){
                // setToken(res.data.token);
                // let data = getAdminByToken();
                // dispatch(setAdminData(res.data.result))
            }   
        })
    }
}



export  {
    displayOverlay,
    setDisplayPage,
    sendAdminInvitation,
    completeAdminRegistration,
    setAdminData,
    getAdmins,
    getAdminDataById
    
}