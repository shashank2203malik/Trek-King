const ExpressError = require('../errorHandlers/expressError.js');
const { reviewSchema } = require('../errorHandlers/schemaValidation.js');


function validateReview(req, res, next) {
    const { error } = reviewSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, message);
    }
    else {
        next();
    }
}


module.exports = validateReview;