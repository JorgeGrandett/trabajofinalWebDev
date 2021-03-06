const express = require('express');
const router = express.Router();

const auth = require('./../../lib/auth');
const passport = require('passport');

router.get('/auth/login', auth.isNotLoggedIn, (req, res) => {
    res.render('pages/auth/login');
});

router.post('/auth/login', auth.isNotLoggedIn, passport.authenticate('local.login', {
    successRedirect: '/panel',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

module.exports = router;