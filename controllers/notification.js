const ObjectId = require('mongodb').ObjectID;
const Notification = require("../schemas/notification");

const createNotification = (data) => {
    return new Promise((resolve, reject) => {
        let newNotification = new Notification(data);
        newNotification.save((err,result) => {
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

const getNotificationsByUser = (data) => {
    return new Promise((resolve, reject) => {
        Notification.find({for : data.userId, read : false}, ((err, res) => {
            if(err) reject({success: false, error : err})
            if(res){
                resolve({success: true, data : res});
            }

        }));
    });
}

const updateNotificationStatus = (data) => {
    return new Promise((resolve, reject) => {
        Notification.updateOne({_id : ObjectId(data.id)}, {$set : {read : true}},{new:true}, ((err, res) => {
            if(err) reject({success: false, error : err})
            if(res){
                resolve({success: true, data : res});
            }

        }));
    });
}

module.exports = {
    createNotification,
    getNotificationsByUser,
    updateNotificationStatus
}