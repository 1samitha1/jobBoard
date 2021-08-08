const express = require('express');
const router = express.Router();
const Seeker = require('../controllers/seeker')

router.post('/search', (req, res) => {
    Seeker.searchCandidates(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log("error while searchCandidates : ", err)
        });
});

router.post('/reject-offers', (req, res) => {
    Seeker.rejectOffers(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log("error while rejecting job offer : ", err)
        });
});

module.exports = router;