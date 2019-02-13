/*
    MIDDLEWARE: isLoggedIn

        Only give access to routes if the user is logged in
        with the exception of the root route

*/

export default (req, res, next) => {
    if (req.originalUrl == '/' || req.isAuthenticated()) return next();
    res.redirect('/login');
}