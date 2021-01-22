const User = require("../schemas/user");
const bcrypt = require("bcryptjs");

const registerNewUser = (data) => {
  return new Promise((resolve, reject) => {
    User.findOne( { $or: [ { email: data.email }, { userName: data.userName } ] } )
    .then((result) => {
      console.log("1")
        if (result) {
          if(result.email === data.email){
            console.log("2")
            reject({success : false, error : "Email address is already exists"})
          }else if(result.userName === data.userName){
            console.log("3")
            reject({success : false, error : "User Name is already exists ! Please add a different User Name"})
          }
        } else {
          console.log("4")
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
