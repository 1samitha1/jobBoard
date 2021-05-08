const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const {registerNewUser, uploadUserImage, updateProvider} = require('../controllers/user')
// const {ensureAuthenticated} = require('../configs/auth');

let storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+"_"+file.originalname)
      }
});

var upload = multer({ storage: storage });

router.post('/register', (req, res) => {
  if(req.body.userType === "provider" || req.body.userType === "seeker"){
    return registerNewUser(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send({success: false, error: "something went wrong", error: err });
        }) 
    }
  });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if(err) {
            res.send({success:false, error : "Something went wrong", error : err})
            throw  err;
        } 

        if(!user){
            res.send({success:false, error : "Wrong username of password!"})
        }else{
            req.logIn(user, err => {
                if(err){
                    res.send({success:false, error : "Something went wrong", error : err})
                    throw  err
                }
                res.send({success:true, authenticatedUser : req.user})
            });
        }
    })(req, res, next)
});

 router.post('/logout', (req, res) => {
    req.logOut();
    res.send({success: true, msg: "logout successful!"})
    
});

router.post('/image-upload', upload.single('image'), (req, res) => {
    console.log('image-upload', req.file)
    console.log('image-upload', req.body.id)
    let userData = {
        filePath : req.file.destination + req.file.filename,
        userType : req.body.userType,
        id : req.body.id
    }
   return uploadUserImage(userData)
   .then((result) => {
       res.send(result)
   })
});

router.put('/update-user', (req, res) => {
    console.log('update-user : ', req.body)
    if(req.body.userType = "provider"){
        return updateProvider(req.body)
        .then((result) => {
            res.send(result);
        })
    }else{
        
    }
    
});

//  router.get('/isAuthenticated', (req, res) => {
//     console.log('vvv isAuthenticated route called body : ',this.ensureAuthenticated());
//     res.send(this.ensureAuthenticated())



module.exports = router;