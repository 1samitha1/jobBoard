const express = require('express');
const router = express.Router();
const SkillTests = require('../controllers/skillTests')

router.post('/create', (req, res) => {
    SkillTests.createTest(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/get_by_user', (req, res) => {
    SkillTests.getTestsByUSer(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/delete-test', (req, res) => {
    SkillTests.deleteSelectedTest(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/skill-test', (req, res) => {
    SkillTests.addCandidateToTest(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/recived-tests', (req, res) => {
    SkillTests.getRecivedTests(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/test-results', (req, res) => {
    SkillTests.saveTestResults(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/get-test-results', (req, res) => {
    SkillTests.getTestResultsByUser(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/clear-test-results', (req, res) => {
    SkillTests.clearTestResult(req.body)
    .then((result) => {
        res.send(result)
    });
});

router.post('/remove-test', (req, res) => {
    SkillTests.removeTestFromCandidate(req.body)
    .then((result) => {
        res.send(result)
    });
});



module.exports = router;