const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
		min: [8, 'Username too short'],
		max: 32,
		sparse: true,
		index: true
	},
	password: {
		type: String,
		require: true,
		min: 8,
		max: 50,
		sparse: true,
		index: true
	}
});

module.exports = mongoose.model('user', UserSchema, 'users');