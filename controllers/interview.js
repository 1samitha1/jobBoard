const ObjectId = require('mongodb').ObjectID;
const Interview = require("../schemas/interview");
const JobApplication = require ('../controllers/job');
const {createNotification} = require('../controllers/notification');

const createInterview = (data) => {
    return new Promise((resolve, reject) => {
        let newInterview = new Interview(data);
        newInterview.save((err,result) => {
          if(err){
            reject({success : false, error : err})
          }else{
            let dateObj = new Date(data.timestamp);
            let date = dateObj.getDate();
            if(date < 10) {
              date = "0"+data;
            }
            let month = dateObj.getMonth()+1;
            if(date < 10) {
              month = "0"+month;
            }
            let year = dateObj.getFullYear();
            let fullDate = year+"-"+month+"-"+date;

            if(result){
              let notifications = [{
                title : `New job Interview Scheduled!`,
                content : `You have schedue a new interview - ${data.title} for - ${fullDate}`,
                timestamp : new Date().getTime(),
                read : false,
                userId : data.companyId,
                category: "job_interview"
              },
              {
                title : `You have a new Job Interview!`,
                content : `The job you applied scheduled a new interview for you - ${data.title}  in - ${fullDate}`,
                timestamp : new Date().getTime(),
                read : false,
                userId : data.candidateId,
                category: "job_interview"
              }];

            notifications.forEach((item) => {
              createNotification(item);
            })

            JobApplication.updateJobApplication({jobId : data.jobId})
              .then((res) => {
                  console.log('crated interview : ', result)
                  resolve({success: true, data: result})
              });  
            }
          }
        })
    });
}

const getInterviewsByUser = (data) => {
    return new Promise((resolve, reject) => {
        let query = {};
        if(data.type="company"){
            query = {companyId : data.userId, timestamp : { $gte : data.timestamp }};
        }else{
            query = {candidateId : data.userId, timestamp : { $gte : data.timestamp }};
        }

       Interview.find(query, ((err, res) => {
           if(err){
            reject({success : false, error : err})
           }else{
            if(result){
              resolve({success: true, data: res})
            }
          }
       }));
    });
}



module.exports = {
    createInterview,
    getInterviewsByUser
}