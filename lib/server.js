/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express();

var HTTPPubSub = require('./httppubsub').HTTPPubSub;

// Let's go...
function start(config, callback) {
  config = config || default_config;
  var pubsub = new HTTPPubSub(config);

  app.configure(function() {
    app.set('port', process.env.PORT || config.port);
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
  app.get(config.prefix + '/subscribers/:id', function(req, res) {
    pubsub.getSubscribers(req.param('id'), function(err, result) {
      if (err) {
        res.json(500, { status : 'KO' });
      } else {
        res.json(200, result);        
      }
    });
  });

  // Subscriber to a resource
  app.post(config.prefix + '/subscribe', function(req, res) {
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
  app.post(config.prefix + '/notify/:id', function(req, res) {

    var resource = req.param('id');
    var payload = req.body;

    pubsub.publish(resource, payload, function(err) {
      if (err) 
        console.log('Error while pushing data ', err);
    });
    // do not wait for result, we just return here...
    res.json(200, { status : 'Published' });
  });

  // unsubscribe
  app.post(config.prefix + '/unsubscribe', function(req, res) {
    var payload = req.body;

    var subscriber = payload.subscriber;
    var resource = payload.resource;

    if (subscriber && resource) {
      pubsub.unsubscribe(resource, subscriber, function(err) {
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
  
  // clear subscribers
  app.get(config.prefix + '/clear', function(req, res) {
    pubsub.clearSubscribers(function(err) {
      if (err) {
        res.json(500, { status : 'KO' });
      } else {
        res.json(200, { status : 'OK' });
      }
    });
  });
    
  //
  app.get(config.prefix + '/', function(req, res) {
    res.json({ message : "Nothing here, check the source..."});
  });

  server = http.createServer(app);
  server.listen(app.get('port'), function () {
    console.log('HTTPPubSub Server is started and listening on', app.get('port'));
  });
}

exports.start = start;