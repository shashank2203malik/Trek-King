const express = require('express');
const router = express.Router({ mergeParams: true });

const Review = require('../models/review.js');
const Trek = require('../models/trekking.js');

const reviews = require('../controllers/reviews.js');
const wrapAsync = require('../utilities/errorHandlers/wrapAsync.js');
const validateReview = require('../utilities/middleware/validateReview.js');
const isLoggedIn = require('../utilities/middleware/isLoggedIn.js');
const isReviewAuthorized = require('../utilities/middleware/isReviewAuthorized.js');


//REVIEW ROUTE
router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview));

router.get('/:reviewId/edit', isLoggedIn, isReviewAuthorized, wrapAsync(reviews.updateReviewForm));

router.put('/:reviewId', isLoggedIn, isReviewAuthorized, validateReview, wrapAsync(reviews.updateReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthorized, wrapAsync(reviews.deleteReview));


module.exports = router;