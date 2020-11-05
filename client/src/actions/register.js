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
        industries.push(userData.industry)
        let userObj = {
            companyName : userData.companyName,
            userName : userData.userName,
            email : userData.email,
            phone : userData.phone,
            password : userData.password,
            industries : industries,
            website: userData.website,
            userType: userData.userType
        }
        // axios.post('/user/register', userData)
    
        fetch('/user/register',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(userObj)
    
         }).then(
            response => response.json(), 
            error => console.log('An error occurred while fetching : ', error)
          ).then((res) => {
            console.log('xxxxxxx result : ', res)
            
          });
    }
    
};






export  {
    openRegisterComponent,
    registerNewUser
}