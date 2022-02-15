const express = require('express');
const router = express.Router();

const auth = require('./../../lib/auth');

router.get('/auth/logout', auth.isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;