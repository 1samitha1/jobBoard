import fetchRequests from '../routes/fetchServer';
import axios from 'axios';
export const OPEN_REGISTER_COMPONENT = 'OPEN_REGISTER_COMPONENT';

const openRegisterComponent = () => {
    return {
        type : OPEN_REGISTER_COMPONENT
    }
};

const registerNewUser = (userData) => {
    return () => {
        let industries = [];
        industries.push(userData.industry);
        delete userData.industry
        userData.industries = industries;
        let userObj = userData;
        
        axios.post('/user/register',
            userObj, {
            withCredentials: true,
            credentials: "same-origin", 
        }).then((res) => {
            if(res && res.data && res.data.success){
                console.log('xxxx --- response.logoutUser : ', res.data)
                window.location.href = "http://localhost:3000/login";
            }
        })
    }
};






export  {
    openRegisterComponent,
    registerNewUser
}