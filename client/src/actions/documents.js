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

export const downloadFile = () => {
    return(dispatch) => {
        axios.get('/user/file-download',{
        withCredentials: true,
        credentials: "same-origin", 
    }).then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `FileName.pdf`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
}

};

// const downloadFile = async () => {
//     const res = await fetch("/user/file-download");
//     const blob = await res.blob();
//     download(blob, "test.pdf");
//    }
