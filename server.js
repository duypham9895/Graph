const express = require('express');
const mongoose = require('mongoose');
// const config = require('config');
const app = express();

const bodyParser = express.json();
const path = require('path');



app.use(bodyParser);

mongoose
	.connect('mongodb+srv://anhduy:duy123@cluster0-mbbcz.mongodb.net/graph?retryWrites=true', {
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('Mongodb connected...'))
	.catch(err => console.log(err));

app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/graphs', require('./routes/api/graphs.js'));

app.use(function(req, res, next) {
	console.log(req.connection.remoteAddress);
	res.header("Access-Control-Allow-Origin", "localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
	next();
});

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('graph-client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'graph-client', 'build', 'index.html'));

	})
}

app.listen(process.env.PORT || 5000, () => console.log('App started'));