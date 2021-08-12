const User = require("../schemas/user");
const Job = require("../schemas/job");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const {createNotification} = require("./notification");
const {sendEmail} = require("./email");

const registerNewUser = (data) => {
  try {
  return new Promise((resolve, reject) => {
    User.findOne({ $or: [{ email: data.email }, { userName: data.userName } ], $and: [{userType : "administrator"}] } )
    .then((result) => {
        if (result) {
          if(result.email === data.email){
            resolve({success : false, msg : "Email address is already exists"})
          }else if(result.userName === data.userName){
            resolve({success : false, msg : "User Name is already exists! Please add a different User Name"})
          }
        } else {
            let newUser = new User(data);
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save()
                .then((savedUser) => {
                  resolve({success: true, msg : "Registration Successful!", data : savedUser});
                });
            });
          });
         }
    });
  });
}catch(err){
   console.log('error while register : ', err) 
}
};

const uploadUserImage = (userData) => {
  return new Promise((resolve, reject) => {
     User.findOneAndUpdate({_id : ObjectId(userData.id)}, {photo : userData.filePath}, 
     { new: true}, ((err, doc) => {
       if(err){
        reject({success: false, Error: err})
       }

       User.findOne({"_id": ObjectId(userData.id) }, (err,result) => {
        delete result.password;
        let token = "";
       if(result.userType === "admin"){
          token = JWT.sign(result.toJSON(), process.env.ACCESS_TOKEN_SECRET)
       }
       resolve({success: true, result : result, token: token})
       })
        
     }))
  })  
};

const uploadResume = (userData) => {
  return new Promise((resolve, reject) => {
     User.findOneAndUpdate({_id : ObjectId(userData.id), userType : userData.userType}, {resume : userData.filePath}, 
     { new: true}, ((err, doc) => {
       if(err){
        reject({success: false, Error: err})
       }else{
        resolve({success: true, result : doc })
       } 
     }))
  })  
};

const updateExistingUser = (userData) => {
  try{
    return new Promise((resolve, reject) => {
      let query = {};

      if(userData.userType === "provider"){
          query =  { "$set": { 
            "companyName": userData.companyName,
            "userName": userData.userName,
            "email" : userData.email,
            "website" : userData.website,
            "industries" : userData.industries,
            "phone" : userData.phone,
            "location" : userData.location,
            "textIndex" : userData.textIndex
          }
        }
      }else if(userData.userType === "seeker"){
          query =  { "$set": { 
            "firstName": userData.firstName,
            "lastName": userData.lastName,
            "userName": userData.userName,
            "email" : userData.email,
            "phone" : userData.phone,
            "industries" : userData.industries,
            "location" : userData.location,
            "textIndex" : userData.textIndex
          }
        }
      }

    //   let query =  { "$set": { 
    //     "companyName": userData.companyName,
    //     "userName": userData.userName,
    //     "email" : userData.email,
    //     "website" : userData.website,
    //     "industries" : userData.industries,
    //     "phone" : userData.phone,
    //     "location" : userData.location,
    //     "textIndex" : userData.textIndex
    //   }
    // }
      
      User.findOneAndUpdate({ "_id": ObjectId(userData.id) }, query, { new: true}).exec((err, res) => {
        if(err) {
            console.log(err);
            reject({error : err})
        } else {
            delete res.password;
            resolve({success : true, result : res})
        }
     });
    });

  }catch(err){
    reject({success : false, error : err});
    console.log('error while updateUser : ', err)
  }
 
};

const updateAdmin = (adminData) => {
  try{

    return new Promise((resolve, reject) => {
      let query =  { "$set": { 
        "firstName": adminData.firstName,
        "lastName": adminData.lastName,
        "email" : adminData.email
      }
    }

    User.findOneAndUpdate({ "_id": ObjectId(adminData.id) }, query, { new: true}).exec((err, res) => {
      if(err) {
          console.log(err);
          reject({error : err})
      } else {
          let accessToken = JWT.sign(res.toJSON(), process.env.ACCESS_TOKEN_SECRET)
          resolve({success:true, type:"admin", result:res, userAccessToken : accessToken}) 
      }
    });

    })

  }catch(err){
    reject({success : false, error : err});
    console.log('error while updateUser : ', err)
  }
}

const authenticateUserToken = (req, res, next) =>{
  try{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token){
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        req.user = user;
        next();
      })
    }

  }catch(err){
    console.log('error while authenticateUserToken : ', err)
  }
}

const completeAdmin = (user) =>{
  try{
    return new Promise((resolve, reject) => {
    let admin = user;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (err, hash) => {
        admin.password = hash;
        let query =  { "$set": { "userName": admin.username, "password": admin.password, "completed" : true } }

        User.findOneAndUpdate({ "_id": ObjectId(admin.id) }, query).exec((err, res) => {
          if(err) {
              console.log(err);
              reject({success:false});
          } else {
             resolve({success:true});
          }
       });
        
      });
    });
  });
  }catch(err){
    console.log('error while authenticateUserToken : ', err)
  }
}

const getUserById = (userId) => {
  try{
    return new Promise((resolve, reject) => {
      User.findOne({_id : ObjectId(userId)},((err, res) => {
        if(err){
          reject({success : false})
        }else{
          resolve({success : true, result : res })
        }

      }));
    });
  }catch(err){
    console.log('error while getting user by id : ', err)
  }
}

const getAdmins = (data) => {
  try{
    return new Promise((resolve, reject) => {
      User.find({userType : "admin", _id : {$ne: ObjectId(data.exclude)}},((err, res) => {
        if(err){
          reject({success : false})
        }else{
          resolve({success : true, result : res })
        }

      }));
    });
  }catch(err){
    console.log('error while getting admins : ', err)
  }
}

const getSeekersAndProviders = (exclude) => {
  try{
    return new Promise((resolve, reject) => {
      User.find({userType : {$ne: exclude}},((err, res) => {
        if(err){
          reject({success : false})
        }else{
          resolve({success : true, result : res })
        }
      }));
    })
    
  }catch(err){
    console.log('error while getting seekers and providers : ', err)
  }
}

const searchSeekersAndProviders = (criteria) => {
  try{
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
    })
    
  }catch(err){
    console.log('error while getting seekers and providers : ', err)
  }
}

const addBookmark = (data) => {
  try{
    return new Promise((resolve, reject) => {
      User.find({_id : ObjectId(data.userId), bookmarks :{$in: [data.itemId]}}, ((err, result) => {
        if(err) reject({success: false, error : "something went wrong while saving job"});
        if(result.length > 0){
          resolve({success : false, error : "Job is aleady saved to the profile"})
         }else{
             User.updateOne({_id : ObjectId(data.userId)}, { $push: { bookmarks: new ObjectId(data.itemId)}}, ((err, doc) => {
            if(err){
              reject({success: false, error : "something went wrong while saving job"})
            }else{
              resolve({success : true, result : doc})
            }
          }));
         }
      }));
    });

  }catch(err){
    console.log('error while adding bookmark : ', err)
  }
}

const getBookmarksForUser = (data) => {
  try{
    return new Promise((resolve, reject) => {
      User.find({_id : ObjectId(data.userId)}, ((err, result) => {
        if(result){
          if(err) reject({success : fase, error : err});
          let oids = [];
          let now = new Date().getTime();
          result[0].bookmarks.forEach(function(item){
          oids.push(new ObjectId(item));
        });
        
          Job.find({_id : {$in :oids}, expireTimestamp : { $gte : now }}, ((err, res) => {
            if(err) reject({success : fase, error : err});
            if(res){
              console.log(' getBookmarksForUser res : ', res)
              resolve({success : true, data : res});
            }
          }));
        }
      }));
    });

  }catch(err){
    console.log('error while fetching user bookmarks : ', err)
  }
}

const saveJobOffer = (data) => {
  return new Promise((resolve, reject) => {
    User.find({_id : ObjectId(data.candidateId), offers :{$in: [data.jobId]}}, ((err, res) => {
      if(err) reject({success:false, error : err})
      else{
        if(res.length === 0){
          User.updateOne({_id : ObjectId(data.candidateId)}, { $push: { offers: new ObjectId(data.jobId)}}, ((err, doc) => {
            if(err){
              reject({success: false, error : "something went wrong while saving job offer"});
            }else{
               // notification for condidate
                let notification = {
                  title : `New Job Offer received!`,
                  content : `You have recived a new job offer from a company for a job`,
                  timestamp : new Date().getTime(),
                  read : false,
                  userId : data.candidateId,
                  category: "job_offers"
                };
                createNotification(notification);

                User.findOne({_id : ObjectId(data.candidateId)}, ((err, result) => {
                  // email for condidate
                  let content = `
                    <h4>Smart Job Board - New Job Offer recived</h4>
                    <p>Hi ${result.firstName} Its a good news</p>
                    <p>You have received a new Job offer from an employee. Login to the system to view more!</p>`

                    sendEmail([result.email], content, "New Job Offer");

                }))

              resolve({success : true});

            }
          }));
        }else{
          resolve({success : false, message : "This job is already offered to this candidate!"})
        }
      }

    }));
  });
};

const getJobOffers = (data) => {
  return new Promise((resolve, reject) => {
    User.find({_id : ObjectId(data.candidateId)}, ((err, res) => {
      if(res && res[0].offers && res[0].offers.length > 0){
        Job.find({_id : {$in :res[0].offers}}, ((err, response) => {
          if(err) reject({success : false})
          if(response){
            resolve({success : true, data : response});
          }
        }));
      }

    }))
  })
}

const deleteUserById = (data) => {
  return new Promise((resolve, reject) => {
    User.deleteOne({_id : ObjectId(data.id)}, ((err, res) => {
      if(err) reject({success : false, error : err})
      if(res){
        resolve({success : true});
      }
    }))

  })
}

const notifyToUser = (data) => {
  return new Promise((resolve, reject) => {
    let notification = {
      title : `An admin has sent you a notification!`,
      content : data.content,
      timestamp : new Date().getTime(),
      read : false,
      userId : data.userId,
      category: ""
    };

    createNotification(notification)
    .then((res) => {
      resolve({success: true})
    })
  })
}

const removeBookmarkFromUser = (data) => {
  return new Promise((resolve, reject) => {
    User.updateOne({_id : ObjectId(data.userId)}, { $pullAll: {bookmarks: [data.jobId] } }, (err, res) => {
      if(err){
        reject({success: false, error: err});
      }else{
        resolve({success: true, data: res});
      }
    })
  });
}

const bookmarkCandidate = (data) => {
  return new Promise((resolve, reject) => {
    
    User.find({_id : ObjectId(data.companyId), bookmarks : data.candidateId}, ((err, res) => {
      if(err) reject({success : false, error : err});
      if(res && res.length > 0){
        resolve({success: false, message : "candidate is already in bookmarks"})
      }else{
        User.updateOne({_id : ObjectId(data.companyId)}, { $push: { bookmarks: new ObjectId(data.candidateId)}}, ((err, doc) => {
          if(err){
            reject({success: false, error : "something went wrong while saving job"})
          }else{
            resolve({success : true, result : doc})
          }

        }))
      }
 
    }))
 });

}

const getCompanyBookmarks = (data) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id : ObjectId(data.companyId)}, ((err, res) => {
      if(err) reject({success : false, error : err});
      if(res){
        if(res.bookmarks && res.bookmarks.length > 0){
          User.find({_id : {$in: res.bookmarks}}, ((err, result) => {
            if(err) reject({success : false, error : err});
            if(result){
              resolve({success : true, data : result});
            }
          }));
        }
      }
    }))
  });
}

module.exports = {
  registerNewUser,
  uploadUserImage,
  updateExistingUser,
  authenticateUserToken,
  completeAdmin,
  updateAdmin,
  getUserById,
  getAdmins,
  getSeekersAndProviders,
  searchSeekersAndProviders,
  uploadResume,
  addBookmark,
  getBookmarksForUser,
  saveJobOffer,
  getJobOffers,
  deleteUserById,
  notifyToUser,
  removeBookmarkFromUser, 
  bookmarkCandidate,
  getCompanyBookmarks
};
