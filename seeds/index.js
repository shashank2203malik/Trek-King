const mongoose = require('mongoose');
const Trek = require('../models/trekking.js');
const cities = require('country-state-city').City.getCitiesOfCountry("IN");
const { places, description } = require('./seedHelpers');
const axios = require('axios');


(async function () {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/TrekkingDB');
		console.log("MongoDB Connection Open");
	}
	catch (err) {
		console.log('ERROR OCCURED!!');
		console.log(err);
	}
})();

const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

// async function randomImg() {
// 	try {
// 		const res = await axios.get('https://api.unsplash.com/photos/random', {
// 			params: {
// 				client_id: 'YzhSPlhdhpHerSeC5Fm2HLXvdkbxSEgzUYpJkMY5NnM',
// 				collections: 3599242,
// 				count: 30
// 			}
// 		})
// 		return res.data.map((el) => el.urls.small);
// 	}
// 	catch (err) {
// 		console.log(err);
// 	}
// }

const seedDB = async function () {
	await Trek.deleteMany({});
	// const imgs = await randomImg();
	for (let i = 1; i <= 250; i++) {
		const randomCity = Math.floor(Math.random() * cities.length);
		const price = Math.floor(Math.random() * 5000) + 5000;
		const trek = new Trek({
			// MY USER ID(THIS WILL BE AN ERROR IS USER COLLECTION IS ALSO DELETED)
			submittedBy: '668abab42157e6db37551023',
			location: `${cities[randomCity].name}, ${cities[randomCity].stateCode}`,
			geometry: {
				type: 'Point',
				coordinates: [cities[randomCity].longitude, cities[randomCity].latitude]
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dxr1r3wig/image/upload/v1721158839/seed-image-1.jpg',
					filename: 'yelpCampSeeds/seed-image-1',
				},
				{
					url: 'https://res.cloudinary.com/dxr1r3wig/image/upload/v1721158830/seed-image-2.jpg',
					filename: 'yelpCampSeeds/seed-image-2',
				},
			],
			title: `${randomElement(description)} ${randomElement(places)}`,
			price,
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, omnis. Aliquid temporibus aperiam accusamus quam enim id necessitatibus nesciunt similique odio repellendus facere laboriosam vitae, tempore reiciendis? Ipsum, quidem ab!'
		});
		await trek.save();
	}
};

seedDB()
	.then(() => {
		mongoose.connection.close();
		console.log("Job done. Connection closed.");
	});
