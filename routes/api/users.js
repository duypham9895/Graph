const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../auth.js');
const User = require('../../models/User.js');

router.get('/', async (req, res) => {
	const user = new User({
		username: 'ngochuyou',
		password: 'abcxyz'
	});

	// bcrypt.genSalt(10, (err, salt) => {
	// 	bcrypt.hash(user.password, salt, (err, hash) => {
	// 		user.password = hash;
	// 		console.log(user.password);
	// 	})
	// });
	
	jwt.sign({ id: user.username },
		'ngochuyou',
		{ expiresIn: 25 },
		(err, token) => {
			res.status(200).json(token);

			console.log(token);
		}
	)
});

router.get('/insert', auth, (req, res) => {
	console.log('hello');
})

module.exports = router;