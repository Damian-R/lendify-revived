import express from 'express';
import passport from 'passport';
import User from '../models/User';

const authRoutes = express.Router();

authRoutes.get('/login', (_req, res) => {
    res.render('login', { sidebar: 'login' });
});

authRoutes.get('/register', (_req, res) => {
    res.render('register', { sidebar: 'register' });
});

authRoutes.post('/register', (req, res) => {
    const newUser = new User({ username: req.body.username }); // create new user in database
    User.register(newUser, req.body.password, (err, user) => { // use passport plugin to register user
        if (!err) {
            passport.authenticate("local")(req, res, () => {
                res.redirect('/');
            });
        } else {
            res.render('register', { error: err.message, sidebar: 'register' });
        }
    });
});

authRoutes.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}), (_req, _res) => {});

authRoutes.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default authRoutes;