const express = require('express');
const router = express.Router();
const general = require('../controllers/general')

router.get('/locations', (req, res) => {
    general.getAllLocations()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: err})
        })
});

router.get('/industries', (req, res) => {
    general.getAllIndustries()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: err})
        })
});

router.get('/salaries', (req, res) => {
    general.getAllSalaries()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: err})
        })
});

router.post('/add-industry', (req, res) => {
    general.addNewIndustry(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: err})
        })
});

router.post('/add-location', (req, res) => {
    general.addNewLocation(req.body)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send({success: fasle, error: err})
        })
});





module.exports = router;