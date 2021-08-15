import axios from 'axios';
import toast from '../configs/toast';
import {setCurrentUser} from './user';
import {setToken} from '../../src/helpers/jwtHandler';
import {setAdminData, getAdminDataById} from './admin';
import {getUserById} from './user';
import download from 'downloadjs'


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
                console.log('admin image upload : ', res.data)
                if(res.data.token !== ""){
                    setToken(res.data.token);
                    dispatch(setAdminData(res.data.result));
                    dispatch(getUserById(userId, "administrator"));
                }else{
                    localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
                    dispatch(setCurrentUser(res.data.result))
                }
            }            
        });
    }
    

}

export const uploadResume = (file, userType, userId) => {
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
};

export const downloadFile = (Obj) => {
    return() => {
        fetch('/user/file-download?'+new URLSearchParams({path: Obj.url}))
            .then(response => response.blob())
            .then(data => download(data, `${Obj.name}_cv.pdf`));
    }
}
