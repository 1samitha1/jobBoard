const ObjectId = require('mongodb').ObjectID;
const Location = require("../schemas/location");
const Industry = require("../schemas/industry");
const Salary = require("../schemas/salaries");

const getAllLocations = () => {
    return new Promise((resolve, reject) => {
        Location.find({}, ((err, res) => {
            if(err) reject({success : false, error : err});
            if(res){
                resolve({success : true, data : res[0].locations});
            }
        }))
      
      });
}

const getAllIndustries = () => {
    return new Promise((resolve, reject) => {
        Industry.find({}, ((err, res) => {
            if(err) reject({success : false, error : err});
            if(res){
                resolve({success : true, data : res[0].industries});
            }
        }))
      
      });
}

const getAllSalaries = () => {
    return new Promise((resolve, reject) => {
        Salary.find({}, ((err, res) => {
            if(err) reject({success : false, error : err});
            if(res){
                resolve({success : true, data : res[0].salaries});
            }
        }))
      
      });
}

const addNewIndustry = (data) => {
    return new Promise((resolve, reject) => {
        var conditions = {
            'industries.value': { $ne: data.value.toLowerCase() }
        };
        
        var update = {
            $addToSet: { industries: { name: data.value , value: data.value.toLowerCase() } }
        }
        
        Industry.findOneAndUpdate(conditions, update, ((err, doc) => {
          if(err) reject({success : false, error : err})
          if(doc){
            resolve({success:true})
          }
        }));
      });
}

const addNewLocation = (data) => {
    return new Promise((resolve, reject) => {
        console.log('vvvvv addNewLocation : ', data)
        var conditions = {
            'locations.value': { $ne: data.value }
        };
        
        var update = {
            $addToSet: { locations: { value: data.value } }
        }
        
        Location.findOneAndUpdate(conditions, update, ((err, doc) => {
          if(err) reject({success : false, error : err})
          if(doc){
            console.log('vvvvv addNewLocation doc : ', doc)
            resolve({success:true})
          }
        }));
      });
}


module.exports = {
    getAllLocations,
    getAllIndustries,
    getAllSalaries,
    addNewIndustry,
    addNewLocation
}