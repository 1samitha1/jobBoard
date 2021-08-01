const createDateAndTime = (timestamp) => {
    let newDate = new Date(timestamp)
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();

    if(date < 10){
        date = "0"+date;
    }

    if(month < 10){
        month = "0"+month;
    }

    if(minutes < 10){
        minutes = "0"+minutes;
    }

    let dateAndTime ={
        date : date+"-"+month+"-"+year,
        time : hours+":"+minutes
    };

    return dateAndTime;

}

module.exports = {
    createDateAndTime}