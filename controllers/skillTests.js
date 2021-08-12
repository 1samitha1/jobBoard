const Test = require("../schemas/skillTests");
const TestResult = require("../schemas/testResult");
const ObjectId = require('mongodb').ObjectID;
const {createNotification} = require("./notification")
const {getUserById} = require("./user");
const {sendEmail} = require("./email");
const {createDateAndTime} = require("./helpers/dateCreator");

const createTest = async (data) => {
    return new Promise((resolve, reject) => {
    let newTest = new Test(data);
    newTest.save((err,result) => {
      if(err){
        reject({success : false, error : err})
      }else{
          resolve({success: true, data: result})
      }
    })
  });
}

const getTestsByUSer = async (user) =>{
  return new Promise((resolve, reject) => {
    Test.find({createdBy : user.id}, (err, result) => {
      if (err) {
        reject({success: false, error: err})
      } else {
        if (result) {
          resolve({success: true, data: result})
        }
      }
    });
  });
}

const deleteSelectedTest = async (data) =>{
  return new Promise((resolve, reject) => {
    Test.deleteOne({_id : data.id}, (err, result) => {
      if (err) {
        reject({success: false, error: err})
      } else {
        resolve({success: true})
      }
    });
  });
}

const addCandidateToTest = async (data) =>{
  return new Promise((resolve, reject) => {
    Test.find({_id : ObjectId(data.testId), applicantList :{$in: [data.candidateId]}}, ((err, result) => {
      if(err){
        reject({success: false, error : "something went wrong while adding candidate to Test"})
      }else{
        if(result.length > 0){
          resolve({success : false, msg : "Test is already sent to the candidate"})
        }else{
          Test.updateOne({_id : ObjectId(data.testId)}, { $push: { applicantList: data.candidateId}}, ((err, doc) => {
            if(err){
              reject({success: false, error : "something went wrong while saving job"})
            }else{
              let notification = {
                title : `New Skill Test received!`,
                content : `You have recived a new Skill Test - " ${data.testName} "`,
                timestamp : new Date().getTime(),
                read : false,
                userId : data.candidateId,
                category: "skill_tests"
              };
              createNotification(notification);

              getUserById(data.candidateId)
              .then((data) => {
                let content = `
                  <h4>Smart Job Board - New skill test</h4>
                  <p>Hello, ${data.result.firstName}</p>
                  <p>You have recived a new skil test for your job appication. Login to the system
                  and attend the test now!</p>`

                sendEmail([data.result.email], content, "New skill Test")
              })

              resolve({success : true, result : doc})
            }
          }));
        }
      }
    }));
  });
}

const getRecivedTests = (data) =>{
  return new Promise((resolve, reject) => {
    Test.find({applicantList :{$in: [data.id]}}, ((err, result) => {
      if(err){
        reject({success: false, error : "something went wrong while Reciving tests"})
      }else{
        resolve({success : true, result : result})
      }
    }));
  });
};

const saveTestResults = (data) =>{
  return new Promise((resolve, reject) => {
    let newTestRes = new TestResult(data);
    newTestRes.save((err,result) => {
      if(err){
        reject({success : false, error : err})
      }else{
          deleteCandidateFromTest({testId : data.testId, candidateId : data.candidateId})
          .then((res) => {
            if(res){
                // notification for company
              let notification = {
                title : `Skil test completed!`,
                content : `Your Candidate "${data.candidate}" has completed the Skill test - "${data.testName}"`,
                timestamp : new Date().getTime(),
                read : false,
                userId : data.companyId,
                category: "skill_tests_results"
              };
              createNotification(notification);
              let createDate = createDateAndTime(data.timestamp);
              let date = createDate.date;
              let time = createDate.time

              // email for candidate
              let content = `
                  <h4>Smart Job Board - Skill test result</h4>
                  <p>Hello, ${data.candidate}</p>
                  <p>You have completed skill test "${data.testName}" on ${date} at ${time}</p>
                  <p>Your scores : ${data.marks}</p>
                  <p>Test result : ${data.result}</p>`

                sendEmail([data.candidateEmail], content, "Skil test result")

              getUserById(data.companyId)
              .then((user) => {
                if(user){

                  // email for company
                  let content = `
                  <h4>Smart Job Board - Skill Test results</h4>
                  <p>The candidate, ${data.candidate} has completed the skill test - "${data.testName}"</p>
                  <p>Candidate scores : ${data.marks}</p>
                  <p>Test result : ${data.result}</p>`

                  sendEmail([user.result.email], content, "Skill test result")
                }
              });
              resolve({success: true, data: result})
            }
          })
      }
    })
  });
};

const deleteCandidateFromTest = (data) =>{
  return new Promise((resolve, reject) => {
    Test.updateOne({_id: ObjectId(data.testId)}, { $pullAll: {applicantList: [data.candidateId] }}, (err, res) => {
      if(err){
        reject({success : false, error : err})
      }else{
        resolve({success: true, data: res})
      }
    })
  });
};

const getTestResultsByUser = (data) => {
  return new Promise((resolve, reject) => {
    TestResult.find({companyId : data.companyId}, (err, res) => {
      if(err){
        reject({success : false, error : err})
      }else{
        resolve({success: true, result: res})
      }
    });
  });
};

const clearTestResult = (data) => {
  return new Promise((resolve, reject) => {
    TestResult.deleteOne({_id : data.id}, (err, res) => {
      if(err){
        reject({success : false, error : err})
      }else{
        resolve({success: true})
      }
    });
  });
};

const removeTestFromCandidate = (data) => {
  return new Promise((resolve, reject) => {
    deleteCandidateFromTest({testId :data.testId, candidateId : data.candidate})
    .then((result) => {
      if(result.success){
        // notification for company
         let notification = {
          title : `Skill test rejected!`,
          content : `Your Candidate "${data.candidateName}" has rejected the Skill test - "${data.testName}"`,
          timestamp : new Date().getTime(),
          read : false,
          userId : data.company,
          category: "tests_portal"
        };
        createNotification(notification);

        getUserById(data.company)
          .then((user) => {
            if(user){
              // email for company
              let content = `
                <h4>Smart Job Board - Skill Test rejected</h4>
                <p>The candidate, ${data.candidateName} has rejected the skill test - "${data.testName}"</p>
                <p>You can find other suitable candidates from the system.</p>`

              sendEmail([user.result.email], content, "Skill test rejected");

              resolve({success: true});
            }
        });
      }
    }) 
  });
};

  
  module.exports = {
    createTest,
    getTestsByUSer,
    deleteSelectedTest,
    addCandidateToTest,
    getRecivedTests,
    saveTestResults,
    deleteCandidateFromTest,
    getTestResultsByUser,
    clearTestResult,
    removeTestFromCandidate
  };