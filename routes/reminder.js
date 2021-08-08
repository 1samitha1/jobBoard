const express = require('express');
const router = express.Router();
const Reminder = require('../controllers/reminder')

router.post('/create', (req, res) => {
    Reminder.createReminder(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});

router.post('/get-company', (req, res) => {
    Reminder.getReminderForCompany(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});


module.exports = router;