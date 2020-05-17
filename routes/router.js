const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("App is running on express")
});

router.post('/login', (req, res) => {
    console.log('vvv login route called ');
    console.log('vvv login route called body : ',req.body);
    res.send({res: "app Login called"})
});

module.exports = router;