module.exports = {
    isLoggedIn(req, res, next) {
        if (!(req.isAuthenticated())) return res.redirect('/auth/login');
        return next();
    },

    isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/panel');
        return next();
    },

    isFuncionary(req, res, next) {
        if (req.user.isFunctionary != 1) return res.redirect('/panel');
        return next();
    }
}