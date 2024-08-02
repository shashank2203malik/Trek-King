if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/errorHandlers/expressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

const trekRoutes = require('./routes/treks.js');
const reviewRoutes = require('./routes/reviews.js');
const authRoutes = require('./routes/auth.js');
const User = require('./models/user.js');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/TrekkingDB';
(async function () {
	try {
		// 'mongodb://127.0.0.1:27017/TrekkingDB'
		await mongoose.connect(dbUrl);
		console.log("MongoDB Connection Open");
	}
	catch (err) {
		console.log('ERROR OCCURED!!');
		console.log(err);
	}
})();

//EJS MIDDLEWARES
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

//UTILITY MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//MONGO-SANITIZE MIDDLEWARE
app.use(mongoSanitize());

//CREATING MONGO SESSION STORE
const store = MongoStore.create({
	mongoUrl: 'mongodb://127.0.0.1:27017/TrekkingDB',
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret: process.env.MONGO_SECRET
	}
});

store.on("error", function (err) {
	console.log("MONGO SESSION ERROR", err);
});

//SESSION MIDDLEWARE
app.use(session({
	store,
	name: 'notsession',
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}));

//FLASH MIDDLEWARE
app.use(flash());

//PASSPORTJS MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//HELMET MIDDLEWARE
app.use(helmet());

const scriptSrcUrls = [
	"https://stackpath.bootstrapcdn.com/",
	"https://kit.fontawesome.com/",
	"https://cdnjs.cloudflare.com/",
	"https://cdn.jsdelivr.net",
	"https://cdn.maptiler.com/",
	"https://res.cloudinary.com/dxr1r3wig/"
];
const styleSrcUrls = [
	"https://kit-free.fontawesome.com/",
	"https://stackpath.bootstrapcdn.com/",
	"https://fonts.googleapis.com/",
	"https://use.fontawesome.com/",
	"https://cdn.jsdelivr.net",
	"https://cdn.maptiler.com/",
	"https://res.cloudinary.com/dxr1r3wig/"
];
const connectSrcUrls = [
	"https://api.maptiler.com/",
	"https://res.cloudinary.com/dxr1r3wig/"
];

const fontSrcUrls = ["https://res.cloudinary.com/dxr1r3wig/"];

app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [],
			connectSrc: ["'self'", ...connectSrcUrls],
			scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'", ...scriptSrcUrls],
			styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
			workerSrc: ["'self'", "blob:"],
			objectSrc: [],
			imgSrc: [
				"'self'",
				"blob:",
				"data:",
				"https://res.cloudinary.com/dxr1r3wig/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
				"https://images.unsplash.com/",
				"https://mdbcdn.b-cdn.net/",
				"https://api.maptiler.com/"
			],
			fontSrc: ["'self'", ...fontSrcUrls],
			mediaSrc: ["https://res.cloudinary.com/dxr1r3wig/"],
			childSrc: ["blob:"]
		},
		crossOriginEmbedderPolicy: true
	})
);


app.use(function (req, res, next) {
	res.locals.loggedInUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});


app.get('/', function (req, res) {
	res.render('home.ejs');
});

app.use('/treks', trekRoutes);
app.use('/treks/:id/reviews', reviewRoutes);
app.use('/', authRoutes);





app.all('*', function (req, res, next) {
	next(new ExpressError(404, 'Page Not Found'));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) {
		err.message = 'Something Went Wrong';
	}
	res.status(status).render('error', { err });
});

const port = process.env.PORT || 3001;
app.listen((port), function () {
	console.log(`Server open at ${port}`);
});
