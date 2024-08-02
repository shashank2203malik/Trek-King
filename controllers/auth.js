const User = require('../models/user');

module.exports.registrationForm = (req, res) => {
    res.render('auth/register');
};

module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email });
        const regUser = await User.register(user, password);
        console.log(regUser);
        req.login(regUser, function (err) {
            if (err) {
                return next();
            }
            req.flash('success', 'Welcome to a world of Adventures!');
            res.redirect('/treks');
        })
    }
    catch (err) {
        if (err.message === `E11000 duplicate key error collection: TrekkingDB.users index: email_1 dup key: { email: "${email}" }`) {
            req.flash('error', 'Email is already taken. Please try again!');
            return res.redirect('/register');
        }
        else {
            req.flash('error', 'Username is already taken. Please try again!');
            res.redirect('/register');
        }
    }
};

module.exports.loginForm = (req, res) => {
    res.render('auth/login');
};

module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    const url = res.locals.returnTo || '/treks';
    res.redirect(url);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (!err) {
            req.flash('success', 'See you soon! Successfully logged out.');
            return res.redirect('/treks');
        }
        next(err);
    });
};