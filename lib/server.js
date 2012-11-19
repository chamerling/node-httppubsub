/**
 *
 * Copyright(c) 2012 Christophe Hamerling <chamerling@linagora.com>
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

app.get('/subscribers/:id', function(req, res) {
  res.json(200, pubsub.getSubscribers(req.param('id')));
});

app.post('/subscribe', function(req, res) {
  var payload = req.body;
  console.log(payload);

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

app.post('/notify/:id', function(req, res) {
  var resource = req.param('id');
  var payload = req.payload;

  pubsub.publish(resource, payload, function(err) {
    if (err) {
      res.json(500, { status : 'KO' });
    } else {
      res.json(200, { status : 'OK' });
    }
  });
});

server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.log('Listening on ', app.get('port'));
});