import {combineReducers} from 'redux';
import userReducer from './user';
import registerReducer from './register';
import notification from './notification';
import search from './search';
import jobs from './jobs';
import general from './general';
import seeker from './seeker';
import tests from './tests';
import admin from './admin';
import reminders from './reminders';
import interviews from './interviews';

export default combineReducers({
    user: userReducer,
    register: registerReducer,
    notification: notification,
    search : search,
    jobs : jobs,
    general : general,
    seeker : seeker,
    tests : tests,
    admin : admin,
    reminders : reminders,
    interviews : interviews
})
