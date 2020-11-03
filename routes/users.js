const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
   console.log('vvv register route called body : ',req.body);
    res.send({res: "app register called"})
});

router.post('/login', (req, res) => {
    console.log('vvv login route called ');
    console.log('vvv login route called body : ',req.body);
    res.send({res: "app Login called"})
});

module.exports = router;