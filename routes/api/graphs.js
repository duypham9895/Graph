const express = require('express');
const router = express.Router();

const Graph = require('../../models/Graph.js');


router.get('/', (req, res) => {
	Graph.findById('5cb96927d745f9137ef93897')
		.then((graph) => res.status(200).json(graph));
	
	const newGraph = new Graph({
		ipAddress: req.connection.remoteAddress,
	});
	newGraph.save()
	.then((graph) => res.json(graph));

	
})

module.exports = router;