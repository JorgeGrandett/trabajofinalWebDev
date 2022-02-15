const express = require('express');
const router = express.Router();

const auth = require('./../../lib/auth');
const passport = require('passport');

router.get('/auth/register', auth.isNotLoggedIn, (req, res) => {
    res.render('pages/auth/register');
});

router.post('/auth/register', auth.isNotLoggedIn, passport.authenticate('local.register', {
    successRedirect: '/panel',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

module.exports = router;