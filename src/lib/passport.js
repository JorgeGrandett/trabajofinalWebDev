const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const row = await pool.query('SELECT * FROM actasunicordoba.users WHERE username = ?;', [username.toLowerCase()]);
    if (row.length > 0) {
        const user = row[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            return done(null, user); 
        } else {
            return done(null, false, req.flash('error', 'La contraseña es incorrecta.'));
        }
    } else {
        return done(null, false, req.flash('error', 'El usuario no existe.'));
    }
}));

passport.use('local.register', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log('iniciado');
    const { firstName, lastName, confirm } = req.body;
    if (password.toLowerCase() != confirm.toLowerCase()) return done(null, false, req.flash('error', 'Las contaseñas no coinciden.'));
    const newUser = {
        firstname: firstName.toLowerCase(),
        lastname: lastName.toLowerCase(),
        username: username.toLowerCase(),
        password: await helpers.encryptPassword(password)
    };
    const row = await pool.query('SELECT * FROM actasunicordoba.users WHERE username = ?;', [newUser.username]);
    if (row.length > 0) return done(null, false, req.flash('error', 'Ya se encuentra registrado ese nombre de usuario.'));
    const result = await pool.query('INSERT INTO actasunicordoba.users SET ?', [newUser]);
    console.log(result)
    newUser.iduser = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    return done(null, user.iduser);
});

passport.deserializeUser(async (iduser, done) => {
    const row = await pool.query('SELECT * FROM actasunicordoba.users WHERE iduser = ?;', [iduser]);
    return done(null, row[0]);
});