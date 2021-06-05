import fetchRequests from '../routes/fetchServer';
import axios from 'axios';
import toast from '../configs/toast'; 
import {setCurrentUser} from './user';
import {setToken} from '../helpers/jwtHandler';

const userLogin = (data) => {
    return (dispatch) => {
        data.userName =  data.userName.toLowerCase();
        fetch('/user/login',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',  
            },
            body: JSON.stringify(data)
            
         }).then(
            response => response.json(), 
            error => console.log('An error occurred while fetching for login : ', error)
          ).then((res) => {
                if(res && res.success){
                    delete res.authenticatedUser.password;
                    localStorage.setItem('authenticatedUser', JSON.stringify(res.authenticatedUser))
                    dispatch(setCurrentUser(res.authenticatedUser))
                    window.location.href = "http://localhost:3000/";
                }else{
                    toast.error('Invalid username or password!',
                    {autoClose:2500, hideProgressBar: true})
                }
          });
    }
};

const adminLogin = (credentialData) => {
    return () => {
        axios.post('/user/admin-login',
        credentialData, {
        withCredentials: true,
        credentials: "same-origin", 
        }).then((res) => {
            if(res.data && res.data.success){
                console.log('vvvvv adminLogin res ', res.data.userAccessToken)
                setToken(res.data.userAccessToken);
                window.location.href = "http://localhost:3000/admin-dashboard";
            }else{
                toast.error('Invalid username or password!',
                {autoClose:2500, hideProgressBar: true})
            }
        })
    }
}
    
const logoutUser = () => {
    return () => {
        axios({
            method: "POST",
            withCredentials: true,
            credentials: "same-origin",
            url:'/user/logout',
            
        }).then((res) => {
            console.log('Logout success : ', res)
        })
    }
}

export {
    userLogin,
    logoutUser,
    adminLogin
}