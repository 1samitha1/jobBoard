const express = require('express');
const router = express.Router();
const Notification = require('../controllers/notification');

router.post('/get', (req, res) => {
    Notification.getNotificationsByUser(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});

router.post('/update', (req, res) => {
    Notification.updateNotificationStatus(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: errr})
        })
});

module.exports = router;