const User = require("../schemas/user");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const registerNewUser = (data) => {
  try {
  return new Promise((resolve, reject) => {
    User.findOne( { $or: [ { email: data.email }, { userName: data.userName } ] } )
    .then((result) => {
        if (result) {
          if(result.email === data.email){
            reject({success : false, error : "Email address is already exists"})
          }else if(result.userName === data.userName){
            reject({success : false, error : "User Name is already exists ! Please add a different User Name"})
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

       resolve({success: true, result : doc})
     }))
  })  
};

const updateProvider = (userData) => {
  try{
    return new Promise((resolve, reject) => {

      let query =  { "$set": { 
        "companyName": userData.companyName,
        "userName": userData.userName,
        "email" : userData.email,
        "website" : userData.website,
        "industries" : userData.industries,
        "phone" : userData.phone,
        "textIndex" : userData.textIndex
      }
    }
      
      User.findOneAndUpdate({ "_id": userData.id }, query).exec((err, res) => {
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

module.exports = {
  registerNewUser,
  uploadUserImage,
  updateProvider,
  authenticateUserToken
};
