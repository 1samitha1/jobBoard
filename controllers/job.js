const Job = require("../schemas/job");
const JobApplication = require("../schemas/jobApplications");
const ObjectId = require('mongodb').ObjectID;
const {createNotification} = require("./notification")

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

    console.log('searchJobs : ', criteria)
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

const deleteJobByJobId = (data) => {
  return new Promise((resolve, reject) => {
    Job.deleteOne({ _id: data.jobId }, ((err, res) => {
      if(err) reject({success: false, error: err})
      else{
        resolve({success: true})
      }
    }))
    })
}

const applyJob = (application) => {
  return new Promise((resolve, reject) => {
    JobApplication.find({jobId : application.jobId, appliedBy : application.appliedBy}, (err, res) => {
      if(err) reject({success : false, error : err});
      if(res && res.length > 0){
        resolve({success : false, message : "you have aready applied to this job!"});
      }else{
          let newJobApplication = new JobApplication(application);
          newJobApplication.save((err,result) => {
            if(err){
              reject({success : false, error : err})
            }else{
              if(result){
                let notification = {
                  title : `New job application received!`,
                  content : `You have recived a new job application for the job " ${result.jobTitle} "`,
                  timestamp : new Date().getTime(),
                  read : false,
                  userId : result.createdBy,
                  category: "job_applications"
                };
                createNotification(notification);
                resolve({success: true, data: result})
              }
            }
          });
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
        updateJobApplicationStatus({jobId : doc.jobId, count : 1})
        .then((res) => {
          if(res.success && res.data._id){
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
   Job.findOneAndUpdate({_id : ObjectId(data.jobId)}, {$inc : {applicants : Number(data.count)}}, {new: true}, ((err, result) => {
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

              if(job){
                item.jobTitle = job.title;
                item.companyName = job.companyName;
              }

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

const getJobApplicationsByUser = (data) => {
  return new Promise((resolve, reject) => {
    JobApplication.find({createdBy : data.id}, (err, result) =>{
      if(err){
        reject({success: false, error : err})
      }
      resolve({sucess : true, result : result});
    });
  })
}

const rejectJobApplication = (data) => {
  return new Promise((resolve, reject) => {
    JobApplication.findOneAndDelete({_id : ObjectId(data.id)},((err, res) => {
      if(err) {
        reject({success: fase})
      }else{
        resolve({success: true})
      }
    }))
  })
}

const updateJobApplication = (data) => {
  return new Promise((resolve, reject) => {
    JobApplication.findOneAndUpdate({_id : ObjectId(data.applicationId)}, {$set : {accepted : true}}, {new: true}, ((err, result) => {
      if(err){
       reject({success : false, error : err})
      }else{
        resolve({success : true, data : result})
      }
    }))
  })
}

const deleteJobApplication = (data) => {
  return new Promise((resolve, reject) => {
    JobApplication.deleteOne({_id : ObjectId(data.applicationId)}, ((err, result) => {
      if(err){
       reject({success : false, error : err})
      }else{
        resolve({success : true, data : result})
      }
    }))
  })
}




module.exports = {
    createNewJob,
    searchJobs,
    getJobs,
    deleteJob,
    applyJob,
    saveApplicationAttachment,
    getAppliedJobs,
    getJobApplicationsByUser,
    rejectJobApplication,
    updateJobApplication,
    deleteJobApplication,
    deleteJobByJobId
    
};
