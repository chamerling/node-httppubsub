/**
 * Creates a server and subscribe to pubsub channel
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */


var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express();

var port = process.env.PORT || 3003;

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

var client = require('../lib/client');

var resource = 'foo';
var pubsub = 'http://localhost:3000';
var count = 0;

app.post('/', function(req, res) {
	var payload = req.body;
	console.log(count++ + ' - Get a request on subscriber');
	console.log(payload);
	// ack
	res.send(200);
});
server = http.createServer(app);

server.listen(port, function () {
  console.log('App is started on ' + port);
  // subscribe to envent producer
  var c = new client.Client(pubsub)
  c.subscribe(resource, 'http://localhost:' + port + '/', function(err) {
  	console.log('Subscribed to resource ', resource);
  });
});
