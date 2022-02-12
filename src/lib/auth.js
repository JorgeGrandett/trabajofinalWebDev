module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/auth/login');
        }
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/home');
        }
    }
}