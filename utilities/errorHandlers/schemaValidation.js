const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// const extension = (joi) => ({
//     type: "string",
//     base: joi.string(),
//     messages: {
//         "string.escapeHTML": "{{#label}} must not include HTML!",
//     },
//     rules: {
//         escapeHTML: {
//             validate(value, helpers) {
//                 const clean = sanitizeHtml(value, {
//                     allowedTags: [],
//                     allowedAttributes: {},
//                 });
//                 if (clean !== value) {
//                     return helpers.error('string.escapeHTML', { value });
//                 }
//                 return clean;
//             },
//         },
//     },
// });


const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                // escape symbols only (e.g. &, <)
                const filtered = sanitizeHtml(value, {
                    allowedTags: false,
                    allowedAttributes: false,
                });
                // remove html
                const clean = sanitizeHtml(filtered, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                // show error if html was present/removed
                if (clean !== filtered) return helpers.error("string.escapeHTML");
            },
        },
    },
});

const Joi = BaseJoi.extend(extension);

module.exports.trekSchema = Joi.object({
    trek: Joi.object({
        title: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        price: Joi.number().min(0).required(),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML()
    }).required(),

    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        opinion: Joi.string().required().escapeHTML(),
        rating: Joi.number().integer().required().min(1).max(5)
    }).required()
})