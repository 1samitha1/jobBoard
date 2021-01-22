const express = require('express');
const router = express.Router();
const passport = require('passport');
const {registerNewUser} = require('../controllers/user')
// const {ensureAuthenticated} = require('../configs/auth');

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
    console.log('vvv logout route called body : ',req.body);
    req.logOut();
    res.send({success: true, msg: "logout successful!"})
    
});

//  router.get('/isAuthenticated', (req, res) => {
//     console.log('vvv isAuthenticated route called body : ',this.ensureAuthenticated());
//     res.send(this.ensureAuthenticated())



module.exports = router;