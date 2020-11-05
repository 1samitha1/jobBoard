const express = require('express');
const router = express.Router();
const passport = require('passport');
const {registerNewUser} = require('../controllers/user')

router.post('/register', (req, res) => {
  
  if(req.body.userType === "provider" || req.body.userType === "seeker"){
    return registerNewUser(req.body)
        .then(data => {
            res.send(data);
           
        }).catch(err => {
            res.send({success: false, error: "something went wrong"});
        }) 
    }
  });

router.post('/login', (req, res, next) => {
    console.log('vvv login route called ');
    console.log('vvv login route called body : ',req.body);
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)


    res.send({res: "app Login called"})
});

module.exports = router;