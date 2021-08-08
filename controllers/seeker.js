const User = require("../schemas/user");
const ObjectId = require('mongodb').ObjectID;

const searchCandidates = async (criteria) => {
    return new Promise((resolve, reject) => {
      if(criteria.textIndex){
        criteria.textIndex= {"$regex": criteria.textIndex, "$options": "i"}
      }
      if(criteria.industries){
        criteria.industries = {"$elemMatch":{"$eq":criteria.industries}}
      }
     
      User.find(criteria, (err, result) => {
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

const rejectOffers = async (data) => {
  return new Promise((resolve, reject) => {
    User.updateOne({_id : ObjectId(data.candidateId)}, { $pullAll: {offers: [data.jobId] } }, (err, res) => {
      if(err){
        reject({success: false, error: err});
      }else{
        resolve({success: true, data: res});
      }
    })
  })
}  
  
  module.exports = {
    searchCandidates,
    rejectOffers
  };