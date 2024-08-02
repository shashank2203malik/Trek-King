const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');
const { cloudinary } = require('../cloudinary/config');


const imageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

imageSchema.virtual('resizeImage').get(function () {
    return this.url.replace('/upload', '/upload/ar_5:3,c_crop');
});

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const trekSchema = new mongoose.Schema({
    title: String,
    images: [imageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    price: Number,
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

trekSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/treks/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});


trekSchema.post('findOneAndDelete', async function (doc) {
    if (doc.reviews.length) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
    if (doc.images.length) {
        for (let img of doc.images) {
            await cloudinary.uploader.destroy(img.filename);
        }
    }
})

module.exports = mongoose.model('Trek', trekSchema);