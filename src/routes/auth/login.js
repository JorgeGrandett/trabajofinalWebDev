const express = require('express');
const router = express.Router();

router.get('/auth/login', (req, res) => {
    res.render('pages/auth/login');
});

module.exports = router;