'use strict';
const dotenv = require('dotenv');
dotenv.config({path: './kawaii.env'});

const mongoose = require('mongoose');
const cluster = require('cluster');
const cpus = require('os').cpus();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('express-jwt');
const compression = require('compression');
const db = 'mongodb://127.0.0.1:27017/kawaii';
mongoose.connect(db, { useMongoClient: true });
require('./server/models/blog.js');
require('./server/models/episode.js');
require('./server/models/user.js');
require('./server/passport.js');
const nodemailer = require('nodemailer');
const routes = require('./server/routes.js');
const Blog = mongoose.model('Blog');
const User = mongoose.model('User');
const Episode = mongoose.model('Episode');
const secret = process.env.SECRET;
const Auth = jwt({secret: secret, userProperty: 'payload'});

if(cluster.isMaster){
	let workers = cpus.length;
	console.log(`Cluster is setting up ${workers} workers...`)
	for(let i = 0; i<workers; i++){
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal)=>{
		console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal ${signal}`);
		console.log(`Starting new worker...`);
		cluster.fork();
	})
}else{
	const app = express();
	app.use(compression());
	const port = process.env.PORT || 5000;

	app.set('port', port);

	app.use(express.static(process.cwd() + '/build'));
	app.get('/*', function(req, res){
		res.sendFile(__dirname + '/build/index.html');
	});
	app.use(bodyParser.json({limit:"100mb"}));
	app.use(bodyParser.urlencoded({limit:"100mb", extended: true}));
	app.use(bodyParser.raw({limit: '100mb'}) ); 
	app.use(bodyParser.text({limit:"100mb"}));
	app.use('/', routes);
	app.use(passport.initialize());

	app.listen(app.get('port'), function(){
		console.log(`Worker ${cluster.worker.id} is listening on port ${port}`);
	});
}