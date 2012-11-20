/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express();

var HTTPPubSub = require('./httppubsub').HTTPPubSub
  , pubsub = new HTTPPubSub();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, '../public')));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

// Get the subscribers for a given resource
app.get('/subscribers/:id', function(req, res) {
  res.json(200, pubsub.getSubscribers(req.param('id')));
});

// Subscriber to a resource
app.post('/subscribe', function(req, res) {
  var payload = req.body;

  var subscriber = payload.subscriber;
  var resource = payload.resource;

  if (subscriber && resource) {
    pubsub.subscribe(resource, subscriber, function(err) {
      if (err) {
        res.json(500, { status : 'KO' });
      } else {
        res.json(200, { status : 'OK' });
      }
    });
  } else {
    res.json(500, { error : 'bar parameters' });
  }
});

// notify
app.post('/notify/:id', function(req, res) {

  var resource = req.param('id');
  var payload = req.body;

  pubsub.publish(resource, payload, function(err) {
    console.log('Data has been published to ' + resource);
  });
  // do not wait for result, we just return here...
  res.json(200, { status : 'Published' });
});

server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Listening on ', app.get('port'));
});