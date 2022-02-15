const express = require('express');
const router = express.Router();

const auth = require('./../lib/auth');

router.use(require('./auth/login'));
router.use(require('./auth/register'));
router.use(require('./auth/logout'));

router.use(require('./panel'));
router.use(require('./newMeeting'));

router.get('/', auth.isNotLoggedIn, (req, res) => {
    res.render('pages/index');
});

module.exports = router;