const Job = require("../schemas/job");
const JobApplication = require("../schemas/jobApplications");
const ObjectId = require('mongodb').ObjectID;

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
    console.log("job application : ", application)
    let newJobApplication = new JobApplication(application);
    newJobApplication.save((err,result) => {
      if(err){
        reject({success : false, error : err})
      }else{
        if(result){
          console.log("job application sucess : ", result)
          resolve({success: true, data: result})
        }
      }
    })
  
  });
}

const saveApplicationAttachment = (attachmentData) => {
  return new Promise((resolve, reject) => {
    JobApplication.findOneAndUpdate({_id : ObjectId(attachmentData.applicationId)}, {attachment : attachmentData.attachment}, 
    { new: true},((err, doc) => {
      if(err){
        reject({success : false, error : err});
      }else{
        console.log("job saveApplicationAttachment sucess 1 : ")
        updateJobApplicationStatus({jobId : doc.jobId, count : 1})
        .then((res) => {
          if(res && res._id){
            resolve({success: true, result : doc});
          }else{
            reject({success : false, error : res.error})
          }
          
        }).catch((error) => {
          console.log("updateJobApplicationStatus failed : ", error)
        })
      }
    }))
  });
}

const updateJobApplicationStatus = (data) => {
  return new Promise((resolve, reject) => {
   Job.findOneAndUpdate({_id : ObjectId(data.jobId)}, {$inc : {'applicants' : data.count}}, {new: true}, ((err, result) => {
     if(err){
      reject({success : false, error : err})
     }else{
       resolve({success : true, data : result})
     }
   }))
  });
}

const getAppliedJobs = (data) => {
  return new Promise((resolve, reject) => {
    JobApplication.find({appliedBy : data.id}, (err, result) =>{
      if(err){
        reject({success: false, error : err})
      }else{
        if(result && result.length > 0){
          let updatedJobData = [];
          result.map((item) => {
            Job.findOne({_id : ObjectId(item.jobId)}, (err, job) => {
              if(err){
                reject({success: false, error : err})
              }
              item.jobTitle = job.title;
              item.companyName = job.companyName;
              updatedJobData.push(item)
             
            });
          });
          setTimeout(() => {
            resolve({sucess : true, result : updatedJobData})
          },100);
          
        }
      }
    })
  });
}


module.exports = {
    createNewJob,
    searchJobs,
    getJobs,
    deleteJob,
    applyJob,
    saveApplicationAttachment,
    getAppliedJobs
    
};
