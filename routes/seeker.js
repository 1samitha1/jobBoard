const express = require('express');
const router = express.Router();
const Seeker = require('../controllers/seeker')

router.post('/search', (req, res) => {
    console.log("called seeker route : ", req.body)
    Seeker.searchCandidates(req.body)
        .then((result) => {
            res.send(result);
        })
    
});

module.exports = router;