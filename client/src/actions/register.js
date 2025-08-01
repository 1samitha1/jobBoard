import axios from 'axios';
import toast from '../configs/toast'; 
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

        let date =  new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate();
        let month =  new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth();
        let year = new Date().getFullYear();
       
        userData.registered = date + "-" + month + "-" + year;
        delete userData.industry
        userData.industries = industries;
        userData.userName = userData.userName.toLowerCase();
        let userObj = userData;
        axios.post('/user/register',
            userObj, {
            withCredentials: true,
            credentials: "same-origin", 
        }).then((res) => {
            if(res && res.data){
                if(res.data.success){
                    window.location.href = "http://localhost:3000/login";
                }else{
                    toast.error(res.data.msg,
                    {autoClose:3000, hideProgressBar: true})
                }
                
            }
        })
    }
};


export  {
    openRegisterComponent,
    registerNewUser
}