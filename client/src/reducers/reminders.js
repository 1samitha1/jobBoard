import {
    SET_COMPANY_REMINDERS,

} from '../actions/reminder';

const reminders = ( state = {
    companyReminders : [],
    

}, action) => {
    switch (action.type) {
        case SET_COMPANY_REMINDERS :
            return {
                ...state,
                companyReminders : action.reminders
            }

          

        default:
            return state;
    }
};

export default reminders;