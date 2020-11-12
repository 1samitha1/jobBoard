const User = require("../schemas/user");
const bcrypt = require("bcryptjs");

const registerNewUser = (data) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: data.email })
    .then((result) => {
      
        if (result) {
          if(result.email === data.email){
            reject({success : false, error : "Email address is already exists"})
          }
        } else {
            let newUser = new User(data);
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save()
                    .then((savedUser) => {
                      console.log('xxxxx registerNewUser savedUser : ', savedUser)
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
