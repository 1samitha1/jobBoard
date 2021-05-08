import axios from 'axios';
import toast from '../configs/toast';
import {setCurrentUser} from './user';


export const uploadImage = (file, userType, userId) => {
    const formData = new FormData();
        formData.append('userType', userType)
        formData.append('id', userId)
        formData.append('image', file);
        
    return(dispatch) => {

          axios.post('/user/image-upload',
          formData, {
            'withCredentials': true,
            'credentials': "same-origin",
            'Content-Type': 'multipart/form-data',

        })
        .then((res) => {
            localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
            dispatch(setCurrentUser(res.data.result))
        });
    }
    

}

