import axios from 'axios';
import toast from '../configs/toast';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        user: user
    }
}

export const updateUserInfo = (userData) => {
    return (dispatch) => {
        axios.put('/user/update-user',
          userData, {
            'withCredentials': true,
            'credentials': "same-origin",
            'Content-Type': 'application/json',

        })
        .then((res) => {
             localStorage.setItem('authenticatedUser', JSON.stringify(res.data.result))
             dispatch(setCurrentUser(res.data.result))
        });
    }
}
