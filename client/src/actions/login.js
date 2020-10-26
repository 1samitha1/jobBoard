import fetchRequests from '../routes/fetchServer';
// export const REMINDER_LIST_FOR_COMPANY = "REMINDER_LIST_FOR_COMPANY";

const userLogin = () => {
    fetchRequests.login();
   // .then(() => {
        return {
            type : "test"
        }
   // })

};

export {
    userLogin
}