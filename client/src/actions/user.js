import axios from 'axios';
import toast from '../configs/toast';
import {getAdminByToken, setToken} from '../helpers/jwtHandler';
import {setAdminData} from './admin';
import {setDisplay} from './general';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_SEEKERS_AND_PROVIDERS = 'SET_SEEKERS_AND_PROVIDERS';
export const SET_SEEKER_BOOKMARKS = 'SET_SEEKERS_BOOKMARKS';
export const SET_JOB_OFFERS = 'SET_JOB_OFFERS';

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

export const removeBookmark = (data) => {
    if(data){
        return (dispatch) => {
            axios.post('/user/remove-bookmark',
            data, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                if(res && res.data.success){
                    dispatch(getBookmarksForUser({userId : data.userId, type: data.type}));

                    toast.success("Saved job removed",
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
                    dispatch(setBookmarksToUser(res.data.data));
    
                }else{
                    toast.error(res.data.error,
                    {autoClose:3000, hideProgressBar: true});
                }
              
            });
        }
    }
}

export const setBookmarksToUser = (data) => {
     if(data){
        return {
            type : SET_SEEKER_BOOKMARKS,
            bookmarks : data
        } 
     }
}



export const sendJobOffer = (data) => {
    return (dispatch) => {
        axios.post('/user/send-offer',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res && res.data.success){
                toast.success('Job Offer Sent Successfuly!',
                {autoClose:2500, hideProgressBar: true});

                dispatch(setDisplay("home"));

            }else{
                toast.error(res.data.message,
                {autoClose:2500, hideProgressBar: true});
            }
          
        });
    }
}

export const getJobOffers = (data) => {
    return (dispatch) => {
        axios.post('/user/get-offers',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res && res.data.success){
                dispatch({
                    type : SET_JOB_OFFERS,
                    data : res.data.data
                })

            }
          
        });
    }
}

export const removeUserById = (data) => {
    return (dispatch) => {
        axios.post('/user/delete',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res && res.data.success){
                dispatch(getUsers("administrator"));

                toast.success('User deleted Successfuly!',
                {autoClose:2500, hideProgressBar: true});

            }
          
        });
    }
}

export const notifyToUser = (data) => {
    return (dispatch) => {
        axios.post('/user/notify',
        data, {
            withCredentials: true,
            credentials: "same-origin",
        }).then((res) => {
            if(res && res.data.success){
                toast.success('Notification sent to the user!',
                {autoClose:2500, hideProgressBar: true});

            }
          
        });
    }
}



