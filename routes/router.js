const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("App is running on express : ")
});




module.exports = router;