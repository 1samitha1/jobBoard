const User = require("../schemas/user");
const bcrypt = require("bcryptjs");

const registerNewUser = (data) => {
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
                     resolve({success: true, msg : "Registration Successful!"});
                });
            });
          });
         }
    });
  });
};

module.exports = {
  registerNewUser,
};
