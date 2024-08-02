const Review = require('../models/review.js');
const Trek = require('../models/trekking.js');

module.exports.createReview = async function (req, res) {
    const trek = await Trek.findById(req.params.id);
    const review = new Review(req.body.review);
    review.submittedBy = req.user._id;
    trek.reviews.push(review);
    await review.save();
    await trek.save();
    req.flash('success', 'Thank you for your review!');
    res.redirect(`/treks/${trek.id}`)
};

module.exports.updateReviewForm = async function (req, res) {
    const { id } = req.params;
    // const review = await Review.findById(reviewId);
    const trek = await Trek.findById(id);
    const review = res.locals.foundReview;
    if (!review) {
        req.flash('error', 'Failed to find the desired review. It may have been removed');
        return res.redirect(`/treks/${id}`);
    }
    res.render('reviews/edit', { review, trek });
};

module.exports.updateReview = async function (req, res) {
    await res.locals.foundReview.updateOne(req.body.review);
    // console.log(res.locals.foundReview);
    req.flash('success', 'Successfully updated your review.');
    res.redirect(`/treks/${req.params.id}`);
}

module.exports.deleteReview = async function (req, res) {
    await Trek.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/treks/${req.params.id}`);
};