import jwt_decode from "jwt-decode";

export const setToken = (token) => {
    sessionStorage.setItem('adminAcessToken', token)
}

export const getToken = () => {
    return sessionStorage.getItem('adminAcessToken');
}

export const extractToken = (token) => {
    if(token){
        return jwt_decode(token);
    }
    
}

export const removeToken = () => {
    sessionStorage.removeItem('adminAcessToken');
    return true;
}

export const getAdminByToken = () => {
    let token = getToken();
    return extractToken(token);
}