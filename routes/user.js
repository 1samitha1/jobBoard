const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {registerNewUser, uploadUserImage, updateExistingUser, updateAdmin, 
    authenticateUserToken, completeAdmin, getUserById, getAdmins, getSeekersAndProviders,
    searchSeekersAndProviders, uploadResume, addBookmark, getBookmarksForUser, saveJobOffer,
    getJobOffers, deleteUserById, notifyToUser, removeBookmarkFromUser, bookmarkCandidate,
    getCompanyBookmarks} = require('../controllers/user')
const JWT = require('jsonwebtoken');
const {sendEmail} = require('../controllers/email');
const {imageStorage, resumeStorage} = require('../configs/multer-config.js');
// const {ensureAuthenticated} = require('../configs/auth');

var upload = multer({ storage: imageStorage });
var resumeUpload = multer({ storage: resumeStorage });

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
                    let user = req.user
                   let accessToken = JWT.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
                   res.send({success:true, userAccessToken : accessToken})
                }  
            });
        }
    })(req, res, next)

});

router.post('/invite-admin',  (req, res, next) => {
    return registerNewUser(req.body)
    .then((result) => {
        if(result.data && result.data._id){
            console.log('admin adding : ', result.data)
            let link = `click this link - http://localhost:3000/admin-complete?id=${result.data._id}`
            let content = `
            <h4>Smart Job Board - Admin Invitation</h4>
            <p>Hello, ${result.data.firstName}</p>
            <p>We are glad to inform you that, one of our admin invite you to join our
                Smart Job Board system as an administrator</p>
            <p>To continue the registration please ${link}</p>    
            `
            sendEmail([result.data.email], content, "Register as an admin")
        }
        res.send(result)
    }).catch((err) => {
        console.log('error while inviting admin : ',err)
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

router.post('/resume-upload', resumeUpload.single('resume'), (req, res) => {
   
    let userData = {
        filePath : req.file.destination + req.file.filename,
        userType : req.body.userType,
        id : req.body.id
    }
   return uploadResume(userData)
   .then((result) => {
       res.send(result)
   })
});



router.put('/update-user', (req, res) => {
    if(req.body.userType === "provider" || req.body.userType === "seeker"){
        return updateExistingUser(req.body)
        .then((result) => {
            res.send(result);
        })
    }else {
        return updateAdmin(req.body)
        .then((result) => {
            res.send(result);
        });
    }
    
});

router.post('/complete-admin', (req, res) => {
    if(req.body){
        return completeAdmin(req.body)
        .then((result) => {
            res.send(result);
        })
    }
});

router.post('/get-user', (req, res) => {
    if(req.body){
        return getUserById(req.body.id)
        .then((result) => {
            res.send(result);
        })
    }
});

router.post('/admins', (req, res) => {
    if(req.body){
        return getAdmins(req.body)
        .then((result) => {
            res.send(result);
        })
    }
});

router.post('/get-users', (req, res) => {
    if(req.body){
        return getSeekersAndProviders(req.body.exclude)
        .then((result) => {
            res.send(result);
        })
    }
});

router.post('/search-users', (req, res) => {
    if(req.body){
        return searchSeekersAndProviders(req.body.criteria)
        .then((result) => {
            res.send(result);
        })
    }
});

router.post('/bookmark', (req, res) => {
    if(req.body){
        console.log("bookmark " , req.body)
        return addBookmark(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log("error while adding bookmark : ", err);
        })
    }
});

router.post('/get-bookmarks', (req, res) => {
    if(req.body){
        console.log("get-bookmarks bookmark " , req.body)
        return getBookmarksForUser(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log("error while adding bookmark : ", err);
        })
    }
});

router.get('/file-download', (req, res) => {
    res.download( req.query.path); 
});

router.post('/send-offer', (req,res) => {
    return saveJobOffer(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while saving Job offer : ', err)
        })
});

router.post('/get-offers', (req,res) => {
    return getJobOffers(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while saving Job offer : ', err)
        })
});

router.post('/delete', (req,res) => {
    return deleteUserById(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while deleting user : ', err)
        })
});

router.post('/notify', (req,res) => {
    return notifyToUser(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while deleting user : ', err)
        })
});

router.post('/remove-bookmark', (req,res) => {
    return removeBookmarkFromUser(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while deleting user : ', err)
        })
});

router.post('/bookmark-candidate', (req,res) => {
    return bookmarkCandidate(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while bookmarking candidate : ', err)
        })
});

router.post('/company-bookmarks', (req,res) => {
    return getCompanyBookmarks(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while getting company bookmarks : ', err)
        })
});






module.exports = router;