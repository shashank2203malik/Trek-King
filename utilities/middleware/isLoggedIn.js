const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        const { id } = req.params;
        req.session.returnTo = (req.method === 'DELETE' ? `/treks/${id}` : req.originalUrl);
        // req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must first register or login!');
        return res.redirect('/login');
    }
    next();
};

module.exports = isLoggedIn;