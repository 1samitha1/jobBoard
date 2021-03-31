const Job = require("../schemas/job");

const createNewJob = (data) => {
  return new Promise((resolve, reject) => {
    let newJob = new Job(data);
    newJob.save((err,result) => {
      if(err){
        reject({success : false, error : err})
      }else{
        if(result){
          resolve({success: true, data: result})
        }
      }
    })
  
  });
};

const searchJobs = (criteria) => {
  return new Promise((resolve, reject) => {
    if(criteria.textIndex){
      criteria.textIndex = {"$regex": criteria.textIndex, "$options": "i"}
    }
    Job.find(criteria, (err, result) => {
      if (err) {
        reject({success: false, error: err})
      } else {
        if (result) {
          resolve({success: true, data: result})
        }
      }
    })
  });
};

const getJobs = (data) => {
  return new Promise((resolve, reject) => {
    Job.find({createdBy : data.createdBy}, (err, result) => {
      if (err) {
        reject({success: false, error: err})
      } else {
        if (result) {
          resolve({success: true, data: result})
        }
      }
    })
  });
};



module.exports = {
    createNewJob,
    searchJobs,
    getJobs
};
