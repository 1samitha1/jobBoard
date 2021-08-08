import axios from 'axios';
import toast from '../configs/toast';
export const SET_COMPANY_REMINDERS = 'SET_COMPANY_REMINDERS';

const createReminder = (data) => {
    return (dispatch) => {
        if(data){
            data.forEach((item) => {
                axios.post('/reminder/create',
                item, {
                    withCredentials: true,
                    credentials: "same-origin",
                });
            });
        }
        
    }
}

const getRemindersForCompany = (data) => {
    return (dispatch) => {
        if(data){
            axios.post('/reminder/get-company',
            data, {
                withCredentials: true,
                credentials: "same-origin",
            }).then((res) => {
                console.log('res.data.data : ', res.data.data)
                if(res.data && res.data.success){
                    dispatch({
                        type : SET_COMPANY_REMINDERS,
                         reminders : res.data.data
                    })
                }
            }); 
        }
        
    }
}


export  {
    createReminder,
    getRemindersForCompany
}