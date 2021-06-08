const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const {registerNewUser, uploadUserImage, updateProvider, authenticateUserToken} = require('../controllers/user')
const JWT = require('jsonwebtoken');
const {sendEmail} = require('../controllers/email');
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
            res.send({success:false, error : "Wrong username or password!"})
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

router.post('/admin-login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if(err) {
            res.send({success:false, error : "Something went wrong", error : err})
            throw  err;
        } 

        if(!user){
            res.send({success:false, error : "Wrong username or password!"})
        }else{
            req.logIn(user, err => {
                if(err){
                    res.send({success:false, error : "Something went wrong", error : err})
                    throw  err
                }else{
                    let user = {
                        _id : req.user._id,
                        firstName: req.user.firstName,
                        lastName: req.user.lastName,
                        email: req.user.email,
                        password: req.user.password,
                        userType: req.user.userType
                    };
                   let accessToken = JWT.sign(user, process.env.ACCESS_TOKEN_SECRET)
                   res.send({success:true, userAccessToken : accessToken})
                }  
            });
        }
    })(req, res, next)

});

router.post('/invite-admin',  (req, res, next) => {
    return registerNewUser(req.body)
    .then((result) => {
        console.log('admin adding : ', result.data)
        let link = `<a href="http://localhost:3000/admin-complete?id=${result.data._id}>click here</a>`
        let content = `
        <h4>Smart Job Board Admin Invitation</h4>
        <p>Hello, ${result.data.firstName}</p>
        <p>We are glad to inform you that, one of our admin invite you to join our
            Smart Job Board system as an admin</p>
        <p>To continue the registration please ${link}</p>    
        `

       sendEmail([result.data.email], content, "Register as an admin")
       .then((result) => {
            res.send(result)
       })
        
    })

});

 router.post('/logout', (req, res) => {
    req.logOut();
    res.send({success: true, msg: "logout successful!"})
    
});

router.post('/image-upload', upload.single('image'), (req, res) => {
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
    if(req.body.userType = "provider"){
        return updateProvider(req.body)
        .then((result) => {
            res.send(result);
        })
    }else{
        
    }
    
});

router.post('/test', authenticateUserToken, (req, res, next) => {
    console.log('testtt  : ', req.user)
})



module.exports = router;