const Test = require("../schemas/skillTests");

const createTest = async (data) => {
    return new Promise((resolve, reject) => {
    let newTest = new Test(data);
    newTest.save((err,result) => {
      if(err){
        reject({success : false, error : err})
      }else{
        if(result){
          resolve({success: true, data: result})
        }
      }
    })
  });
}

const getTestsByUSer = async (user) =>{
  return new Promise((resolve, reject) => {
    console.log('getTestsByUSer : ', user.id)
    Test.find({createdBy : user.id}, (err, result) => {
      if (err) {
        reject({success: false, error: err})
      } else {
        if (result) {
          console.log('getTestsByUSer result : ', result)
          resolve({success: true, data: result})
        }
      }
    });
  });
}
  
  module.exports = {
    createTest,
    getTestsByUSer
  };