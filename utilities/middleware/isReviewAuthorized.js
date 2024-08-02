const Review = require('../../models/review');
const wrapAsync = require('../errorHandlers/wrapAsync');

const isReviewAuthorized = wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    res.locals.foundReview = review;
    if (!review.submittedBy.equals(req.user._id)) {
        req.flash('error', 'Sorry you are not authorized to do that.');
        return res.redirect(`/treks/${id}`);
    }
    next();
});

module.exports = isReviewAuthorized;