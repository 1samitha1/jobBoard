import axios from 'axios';
import toast from '../configs/toast';

const createReminder = (data) => {
    return (dispatch) => {
        if(data){
            data.forEach((item) => {
                axios.post('/reminder/create',
                item, {
                    withCredentials: true,
                    credentials: "same-origin",
                })
            })
        }
        
    }
}


export  {
    createReminder
}