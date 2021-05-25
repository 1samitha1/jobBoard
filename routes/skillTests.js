const express = require('express');
const router = express.Router();
const SkillTests = require('../controllers/skillTests')

router.post('/create', (req, res) => {
    console.log('call route createTest')
    SkillTests.createTest(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/get_by_user', (req, res) => {
    console.log('call route createTest')
    SkillTests.getTestsByUSer(req.body)
    .then((result) => {
        res.send(result)
    });
});


module.exports = router;