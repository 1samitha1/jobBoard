const ObjectId = require('mongodb').ObjectID;
const Reminder = require("../schemas/reminder");

const createReminder = (data) => {
    return new Promise((resolve, reject) => {
        let newReminder = new Reminder(data);
        newReminder.save((err,result) => {
          if(err){
            reject({success : false, error : err})
          }else{
            if(result){
              resolve({success: true, data: result})
            }
          }
        })
      
    });
}

const getReminderForCompany = (data) => {
  return new Promise((resolve, reject) => {
    Reminder.find({companyId : ObjectId(data.companyId)}, (err, document) => {
      if(err){
        reject({success : false, error : err})
      }else{
        if(document){
          resolve({success: true, data: document})
        }
      }
    }); 
  });
}


module.exports = {
    createReminder,
    getReminderForCompany
}