import express from 'express';
import bodyParser from 'body-parser';
import passport from './passport';
import session from 'express-session';

const app = express();

// Get static files from public directory
app.use(express.static('public'));

// TODO: learn what this does
app.use(bodyParser.urlencoded({ extended: true }));

// Use EJS files for views (embedded javascript)
app.set('view engine', 'ejs');

// TODO: learn what this does
app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: false
}));

// Configure express to use passport for auth and session management
app.use(passport.initialize());
app.use(passport.session());

// Configure a middleware to set currentUser variable to be used in EJS files
app.use((req, res, next) => {
    if (req.url == '/favicon.ico') return next(); // don't trigger middleware on favicon request
    res.locals.currentUser = req.user;
    res.locals.test = 'hello';
    next();
});

export default app;