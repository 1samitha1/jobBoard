import fetchRequests from '../routes/fetchServer';
import axios from 'axios';
export const OPEN_REGISTER_COMPONENT = 'OPEN_REGISTER_COMPONENT';
// import Toastr from 'toastr';
// Toastr.options.closeButton = true;
// Toastr.options.preventDuplicates = true;

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
            error => console.log('An error occurred while fetching for register : ', error)
          ).then((res) => {
            console.log('xxxxxxx result : ', res)
            if(res.success){
                //Toastr.success(res.msg);
                this.history.pushState(null, '/login');
            }else{
                //Toastr.fail(res.error);
            }
            
          });
    }
    
};






export  {
    openRegisterComponent,
    registerNewUser
}