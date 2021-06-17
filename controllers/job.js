const Job = require("../schemas/job");
const JobApplication = require("../schemas/jobApplications");

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
          console.log('xxxxx getJobs res : ', result)
          resolve({success: true, data: result})
        }
      }
    })
  });
};

const deleteJob = (data) => {
  return new Promise((resolve, reject) => {
    Job.deleteOne({ _id: data.jobId }).then(() => {
      getJobs({createdBy : data.createdBy})
      .then((result) => {
        resolve(result);
      })
    }).catch((error) =>{
      console.log(error);
      reject({success: false, error: err})
    })
  })
}

const applyJob = (application) => {
  return new Promise((resolve, reject) => {
    let newJobApplication = new JobApplication(application);
    newJobApplication.save((err,result) => {
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

const saveApplicationAttachment = (attachment) => {
  return new Promise((resolve, reject) => {

  });
}

module.exports = {
    createNewJob,
    searchJobs,
    getJobs,
    deleteJob,
    applyJob,
    saveApplicationAttachment
};
