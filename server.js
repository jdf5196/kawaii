'use strict';

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const db = 'mongodb://localhost/kawaii';
mongoose.connect(db);
require('./server/models/blog.js');
require('./server/models/episode.js');
const routes = require('./server/routes.js');

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


app.listen(app.get('port'), function(){
	console.log('Server listening on port ' + port);
});