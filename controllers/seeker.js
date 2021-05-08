const User = require("../schemas/user");

const searchCandidates = async (criteria) => {
    return new Promise((resolve, reject) => {
      if(criteria.textIndex){
        criteria.textIndex= {"$regex": criteria.textIndex, "$options": "i"}
      }
      if(criteria.industries){
        criteria.industries = {"$elemMatch":{"$eq":criteria.industries}}
      }
      
      console.log('search criteria : ', criteria)
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
  
  module.exports = {
    searchCandidates
  };