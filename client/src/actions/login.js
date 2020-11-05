import fetchRequests from '../routes/fetchServer';
// export const REMINDER_LIST_FOR_COMPANY = "REMINDER_LIST_FOR_COMPANY";

const userLogin = (data) => {

    fetch('/user/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)

     }).then(
        response => response.json(), 
        error => console.log('An error occurred while fetching : ', error)
      ).then((res) => {
        console.log('xxxxxxx result : ', res)
        
      });
    
        return {
            type : "test"
        }
  

};

export {
    userLogin
}