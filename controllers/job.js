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
  console.log('xxxxx getJobs : ', data)
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

module.exports = {
    createNewJob,
    searchJobs,
    getJobs,
    deleteJob
};
