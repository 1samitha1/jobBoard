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

module.exports = router;