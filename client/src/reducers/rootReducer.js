import {combineReducers} from 'redux';
import loginReducer from './login';
import registerReducer from './register';
import notification from './notification';

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    notification: notification
})
