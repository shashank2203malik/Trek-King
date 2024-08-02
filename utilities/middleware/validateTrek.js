const ExpressError = require('../errorHandlers/expressError.js');
const { trekSchema } = require('../errorHandlers/schemaValidation.js');

const validateTrek = function (req, res, next) {
    const { error } = trekSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, message);
    }
    else {
        next();

    }
};

module.exports = validateTrek;