import axios from 'axios';
import toast from '../configs/toast';
import {getAdminByToken, setToken} from '../helpers/jwtHandler';
import {setAdminData} from './admin';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_SEEKERS_AND_PROVIDERS = 'SET_SEEKERS_AND_PROVIDERS';

export const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        user: user
    }
}

export const updateUserInfo = (userData) => {
    return (dispatch) => {
        axios.put('/user/update-user',
          userData, {
            'withCredentials': true,
            'credentials': "same-origin",
            'Content-Type': 'application/json',

        })
        .then((res) => {
            if(res.data.type === "admin"){
                setToken(res.data.userAccessToken);
                let data = getAdminByToken();
                dispatch(getUserById(data._id, "admin"));
            }else{
                localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
                dispatch(setCurrentUser(res.data.result))
            }
             
        });
    }
}

export const getUserById = (id, type) => {
    return (dispatch) => {
        axios.post('/user/get-user',
        {id:id}, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res && res.data){
            if(res.data.success){
                if(type === "admin"){
                    dispatch(setAdminData(res.data.result));
                }
                
            }else{
                toast.error("Error while getting user",
                {autoClose:3000, hideProgressBar: true})
            }
            
        }   
    })
    }
}

export const getUsers = (exclude) => {
    return (dispatch) => {
        axios.post('/user/get-users',
        {exclude:exclude}, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res && res.data){
            if(res.data.success){
               dispatch({
                   type : SET_SEEKERS_AND_PROVIDERS,
                   users : res.data.result
               })
                
            }
            
        }   
    })
    }
}

export const searchUsers = (data) => {
    return (dispatch) => {
        axios.post('/user/search-users',
        {criteria:data}, {
        withCredentials: true,
        credentials: "same-origin", 
    }).then((res) => {
        if(res && res.data){
            if(res.data.success){
               dispatch({
                   type : SET_SEEKERS_AND_PROVIDERS,
                   users : res.data.data
               })
                
            }
            
        }   
    })
    }
}

export const addBookmark = (data) => {
    if(data){
        return () => {
            axios.post('/user/bookmark',
            data, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res && res.data.success){
                    toast.success("Job saved to your profile",
                    {autoClose:3000, hideProgressBar: true});
    
                }else{
                    toast.error(res.data.error,
                    {autoClose:3000, hideProgressBar: true});
                }
              
            });
        }
    }
}

export const getBookmarksForUser = (data) => {
    if(data){
        return (dispatch) => {
            axios.post('/user/get-bookmarks',
            data, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res && res.data.success){
                    
    
                }else{
                    toast.error(res.data.error,
                    {autoClose:3000, hideProgressBar: true});
                }
              
            });
        }
    }
}

