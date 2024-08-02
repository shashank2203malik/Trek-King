const express = require('express');
const router = express.Router();
const Trek = require('../models/trekking');
const treks = require('../controllers/treks.js');
const wrapAsync = require('../utilities/errorHandlers/wrapAsync.js');
const isLoggedIn = require('../utilities/middleware/isLoggedIn.js');
const isAuthorized = require('../utilities/middleware/isAuthorized.js');
const validateTrek = require('../utilities/middleware/validateTrek.js');
const multer = require('multer');
const { storage } = require('../cloudinary/config.js');
const upload = multer({ storage });




//TREK ROUTES
router.get('/', wrapAsync(treks.index));

router.get('/create', isLoggedIn, treks.newTrekForm);

router.post('/', isLoggedIn, upload.array('image'), validateTrek, wrapAsync(treks.createNewTrek));

router.get('/:id', wrapAsync(treks.trekDetails));

router.get('/:id/edit', isLoggedIn, isAuthorized, wrapAsync(treks.updateTrekForm));

router.put('/:id', isLoggedIn, isAuthorized, upload.array('image'), validateTrek, wrapAsync(treks.updatedTrek));

router.delete('/:id', isLoggedIn, isAuthorized, wrapAsync(treks.deleteTrek));

module.exports = router;