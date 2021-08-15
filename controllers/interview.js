const ObjectId = require('mongodb').ObjectID;
const Interview = require("../schemas/interview");
const {updateJobApplication} = require ('../controllers/job.js');
const {createNotification} = require('../controllers/notification');
const {getUserById} = require("./user");
const {sendEmail} = require("./email");
const {createDateAndTime} = require("./helpers/dateCreator");

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
            if(month < 10) {
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
                category: "scheduler"
              },
              {
                title : `You have a new Job Interview!`,
                content : `The job you applied scheduled a new interview for you - ${data.title}  in - ${fullDate}`,
                timestamp : new Date().getTime(),
                read : false,
                userId : data.candidateId,
                category: "scheduler"
              }];

            notifications.forEach((item) => {
              createNotification(item);
            })

            let createDate = createDateAndTime(data.timestamp);
            let date = createDate.date;
            let time = createDate.time;

            // email for company
            let content = `
            <h4>Smart Job Board - New Job Interview</h4>
            <p>Interview for : ${data.jobTitle}</p>
            <p>You have scheduled an interview with "${data.canidateName}" on ${date} at ${time}</p>`

           sendEmail([data.companyEmail], content, "New Job Interview");

           getUserById(data.candidateId)
              .then((user) => {
                  // email for condidate
                  let content = `
                  <h4>Smart Job Board - New Job Interview</h4>
                  <p>The Job you applied,  ${data.jobTitle} has schedule an interview</p>
                  <p>Date : ${date}</p>
                  <p>Time : ${time}</p>`

                  sendEmail([user.result.email], content, "New Job Interview")

                  
              });
            }
            updateJobApplication({applicationId : data.applicationId})
              .then((res) => {
                  resolve({success: true, data: res})
            }); 
          }
        });
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
            if(res){
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