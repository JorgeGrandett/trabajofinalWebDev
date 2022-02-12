const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.singin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    var row;
    row = await pool.query('SELECT * FROM `clothes_designer_db`.`users` WHERE `username` = ?', [username.toLowerCase()]);
    if (row.length > 0) {
        const user = row[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            row = await pool.query('SELECT `idpermit` FROM `clothes_designer_db`.`permits` WHERE `iduser` = ?', [user.iduser]);
            if (!(row.length > 0)) {
                const newPermits = {
                    iduser: user.iduser,
                    level: 0
                };
                await pool.query('INSERT INTO `clothes_designer_db`.`permits` SET ?', [newPermits]);
            }
            if (user.active) {
                return done(null, user); 
            } else {
                return done(null, user, req.flash('info', 'Your account is not activated yet.'));
            }
        } else {
            return done(null, false, req.flash('error', 'Incorrect password.'));
        }
    } else {
        return done(null, false, req.flash('error', 'The user does not exist.'));
    }
}));

passport.use('local.singup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    if (req.body.passwordConfirm != password) return done(null, null, req.flash('error', 'The password not match.'));
    // user account
    const { firstname, lastname, email } = req.body;
    const newUser = {
        username: username.toLowerCase(),
        firstname: firstname.toLowerCase(),
        lastname: lastname.toLowerCase(),
        email: email.toLowerCase()
    };
    let row;
    row = await pool.query('SELECT `iduser` FROM `clothes_designer_db`.`users` WHERE `email` = ?', [newUser.email]);
    if (row.length > 0) done(null, null, req.flash('error', 'The e-mail already exists.'));
    row = await pool.query('SELECT `iduser` FROM `clothes_designer_db`.`users` WHERE `username` = ?', [newUser.username]);
    if (row.length > 0) done(null, null, req.flash('error', 'The user already exists.'));
    newUser.password = await helpers.encryptPassword(password);
    newUser.active = false;
    const result = await pool.query('INSERT INTO `clothes_designer_db`.`users` SET ?', [newUser]);
    newUser.iduser = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    return done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    const row = await pool.query('SELECT * FROM `clothes_designer_db`.`users` WHERE `iduser` = ?', [iduser]);
    return done(null, row[0]);
});