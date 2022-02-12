const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

// Initializations
const app =  express();
const http = require('http').Server(app);
require('./lib/passport');

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'nodesession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variable
app.use(async (req, res, next) => {
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
http.listen(app.get('port'), async function() {
    console.log("Server runing");
    console.log("listening on *:" + app.get('port'));
});