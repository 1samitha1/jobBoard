const express = require('express');
const router = express.Router();
const passport = require('passport');
const {registerNewUser} = require('../controllers/user')
// const {ensureAuthenticated} = require('../configs/auth');

router.post('/register', (req, res) => {
  if(req.body.userType === "provider" || req.body.userType === "seeker"){
      console.log('xxxxxx reg req recived : ', req.body)
    return registerNewUser(req.body)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send({success: false, msg: "something went wrong", error: err });
        }) 
    }
  });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if(err) {
            res.send({success:false, msg : "Something went wrong", error : err})
            throw  err;
        } 

        if(!user){
            res.send({success:false, msg : "Wrong username of password!"})
        }else{
            req.logIn(user, err => {
                if(err){
                    res.send({success:false, msg : "Something went wrong", error : err})
                    throw  err
                }
                console.log('vvvvvvv req session : ', req.session)
                console.log('vvvvvvv req user : ', req.user)
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