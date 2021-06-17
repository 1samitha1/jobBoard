import axios from 'axios';
import toast from '../configs/toast';
import {setCurrentUser} from './user';
import {setToken} from '../../src/helpers/jwtHandler';
import {setAdminData} from './admin';


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
            if(res.data){
                if(res.data.token !== ""){
                    setToken(res.data.token);
                    dispatch(setAdminData(res.data.result))
                }else{
                    localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
                    dispatch(setCurrentUser(res.data.result))
                }
            }            
        });
    }
    

}

export const uploadResume = (file, userType, userId) => {
    console.log('vvvvv file:  ', file)
    const formData = new FormData();
        formData.append('userType', userType)
        formData.append('id', userId)
        formData.append('resume', file);
        
    return(dispatch) => {

          axios.post('/user/resume-upload',
          formData, {
            'withCredentials': true,
            'credentials': "same-origin",
            'Content-Type': 'multipart/form-data',

        })
        .then((res) => {
            if(res.data && res.data.result){
                localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
                dispatch(setCurrentUser(res.data.result))
            }
        });
    }
}

