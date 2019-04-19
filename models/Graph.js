const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GraphSchema = new Schema({
	
	vertices: {
		type: Array,
		required: true,
		sparse: true,
	},

	edges : {
		type: Array,
		required: true,
		sparse: true,
	},

	createdOn: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('graph', GraphSchema, 'graphs');