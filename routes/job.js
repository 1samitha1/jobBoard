const express = require('express');
const router = express.Router();
const Job = require('../controllers/job')

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
    console.log('delete route : ', req.body)
    Job.deleteJob(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

module.exports = router;