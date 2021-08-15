const express = require('express');
const router = express.Router();
const Interview = require('../controllers/interview.js')

router.post('/create', (req, res) => {
    Interview.createInterview(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});

router.post('/get-company', (req, res) => {
    Interview.getInterviewsByUser(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});

module.exports = router;