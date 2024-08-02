const { cloudinary } = require('../cloudinary/config');
const Trek = require('../models/trekking');
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async function (req, res) {
    const treks = await Trek.find({});
    res.render('treks/index', { treks });
};

module.exports.newTrekForm = function (req, res) {
    res.render('treks/create');
};

module.exports.createNewTrek = async function (req, res) {
    const geoData = await maptilerClient.geocoding.forward(req.body.trek.location, { limit: 1 });
    const trek = new Trek(req.body.trek);
    if (geoData.features.length === 0) {
        console.log(geoData);
        trek.geometry = {
            type: 'Point',
            coordinates: [78.962883, 20.593683]
        }
    }
    else {
        trek.geometry = geoData.features[0].geometry;
    }
    trek.images = req.files.map(el => ({ url: el.path, filename: el.filename }));
    trek.submittedBy = req.user._id;
    await trek.save();
    req.flash('success', 'Succesfully added a new trek.');
    res.redirect(`/treks/${trek._id}`);
};

module.exports.trekDetails = async function (req, res) {
    const { id } = req.params;
    const trek = await Trek.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'submittedBy'
        }
    }).populate('submittedBy');
    if (!trek) {
        req.flash('error', 'Failed to find the desired trek. It may have been removed');
        return res.redirect('/treks');
    }
    res.render('treks/details', { trek });
};

module.exports.updateTrekForm = async function (req, res) {
    // const { id } = req.params;
    // const trek = await Trek.findById(id);
    const trek = res.locals.foundTrek;
    if (!trek) {
        req.flash('error', 'Failed to find the desired trek. It may have been removed');
        return res.redirect('/treks');
    }
    res.render('treks/edit', { trek });
};

module.exports.updatedTrek = async function (req, res) {
    // const { id } = req.params;
    // const trek = await Trek.findByIdAndUpdate(id, { ...req.body.trek }, { new: true });
    const trek = res.locals.foundTrek;
    await trek.updateOne(req.body.trek);
    const geoData = await maptilerClient.geocoding.forward(req.body.trek.location, { limit: 1 });
    trek.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(el => ({ url: el.path, filename: el.filename }));
    trek.images.push(...imgs);
    await trek.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await trek.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Successfully updated this trek.');
    res.redirect(`/treks/${trek.id}`);
};

module.exports.deleteTrek = async function (req, res) {
    const { id } = req.params;
    await Trek.findByIdAndDelete(id);
    req.flash('success', 'You have deleted one of your wonderful treks.');
    res.redirect('/treks')
};

