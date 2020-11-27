import {combineReducers} from 'redux';
import loginReducer from './login';
import registerReducer from './register';
import notification from './notification';
import search from './search';

export default combineReducers({
    login: loginReducer,
    register: registerReducer,
    notification: notification,
    search
})
