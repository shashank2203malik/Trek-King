const Trek = require('../../models/trekking');
const wrapAsync = require('../errorHandlers/wrapAsync');

const isAuthorized = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const trek = await Trek.findById(id);
    res.locals.foundTrek = trek;
    if (!trek.submittedBy.equals(req.user._id)) {
        req.flash('error', 'Sorry you are not authorized to do that.');
        return res.redirect(`/treks/${id}`);
    }
    next();
});

module.exports = isAuthorized;