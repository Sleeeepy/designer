/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express 	= require('express'),
	mongoose 	= require('mongoose'),
	Grid = require('gridfs-stream'),
	config 		= require('./config/environment');


// Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connect(config.mongo.uri, config.mongo.options);
//mongoose.connection.once('open',function(){
//	var gfs = Grid(mongoose.connection.db, mongoose.mongo);
//});




// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
