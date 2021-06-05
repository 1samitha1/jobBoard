import jwt_decode from "jwt-decode";

export const setToken = (token) => {
    console.log('setToken... ',token )
    sessionStorage.setItem('adminAcessToken', token)
}

export const getToken = () => {
    return sessionStorage.getItem('adminAcessToken');
}

export const extractToken = (token) => {
    return jwt_decode(token);
}

export const removeToken = () => {
    sessionStorage.removeItem('adminAcessToken');
    return true;
}