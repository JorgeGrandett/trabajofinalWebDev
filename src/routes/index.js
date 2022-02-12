const express = require('express');
const router = express.Router();

router.use(require('./auth/login'));

router.get('/', (req, res) => {
    console.log('test');
    res.send('test');
});

module.exports = router;