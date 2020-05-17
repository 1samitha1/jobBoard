export const OPEN_REGISTER_COMPONENT = 'OPEN_REGISTER_COMPONENT';
export const BACK_TO_LOGIN = 'BACK_TO_LOGIN';

const openRegisterComponent = () => {
    return {
        type : OPEN_REGISTER_COMPONENT
    }
};

const backToLogin = () => {
    return {
        type : BACK_TO_LOGIN
    }
};





export  {
    openRegisterComponent,
    backToLogin
}