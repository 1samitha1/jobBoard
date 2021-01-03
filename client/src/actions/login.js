import fetchRequests from '../routes/fetchServer';
import axios from 'axios';
import toast from '../configs/toast'; 

// export const REMINDER_LIST_FOR_COMPANY = "REMINDER_LIST_FOR_COMPANY";

const userLogin = (data) => {
    return () => {
        // axios({
        //     method: "POST",
        //     data: data,
        //     withCredentials: true,
        //     credentials: "same-origin",
        //     url:'/user/login',
            
        // }).then((res) => {
        //     console.log('xxxx --- response.authenticatedUser : ', res)
        // })

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
                    window.location.href = "http://localhost:3000/";
                }else{
                    toast.error('Invalid username or password!',
                    {autoClose:2500, hideProgressBar: true})
                }
          });
    }
};

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
    logoutUser
}