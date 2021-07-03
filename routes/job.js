const express = require('express');
const router = express.Router();
const multer = require('multer');
const Job = require('../controllers/job');
const {imageStorage, resumeStorage} = require('../configs/multer-config.js');

var resumeUpload = multer({ storage: resumeStorage });

router.post('/create', (req, res) => {
    Job.createNewJob(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

router.post('/search', (req, res) => {
    Job.searchJobs(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

router.post('/get', (req, res) => {
    Job.getJobs(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

router.post('/delete', (req, res) => {
    Job.deleteJob(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

router.post('/apply', (req,res) => {
    Job.applyJob(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while applying job : ', err)
        })
})

router.post('/application-attachment', resumeUpload.single('attachment'), (req,res) => {
    let applicationAttachment = {
        applicationId : req.body.applicationId,
        attachment : req.file.destination + req.file.filename
    }
    Job.saveApplicationAttachment(applicationAttachment)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('')
        })
})

router.post('/applied-jobs', (req,res) => {
    Job.getAppliedJobs(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log('error while applied jobs : ', err)
        })
})

module.exports = router;