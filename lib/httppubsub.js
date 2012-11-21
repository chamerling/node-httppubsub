/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var backend = require('./db')
  , cfg = require('./config')
  , request = require('request');

/**
 *
 * @param config
 * @constructor
 */
var HTTPPubSub = function HTTPPubSub(config) {
	this._config = config || cfg.default_config;
  this._backend = backend.getClient(this._config);
  this._debug = this._config.debug;
}

exports.HTTPPubSub = HTTPPubSub;

/**
 *
 * @param resource
 * @param message
 * @param cb
 */
HTTPPubSub.prototype.publish = function(resource, message, cb) {
  if (this._debug)
	 console.log('Publish to resource ' + resource);

  var self = this;

  this._backend.getSubscribers(resource, function(err, subscribers) {
    for(var subscriber in subscribers) {
      var endpoint = subscribers[subscriber];
      self._send(endpoint, message, function() {
      });
    }
    // do not wait that all send are completed!
    if (cb) cb();
  });
}

/**
 *
 * @param resource
 * @param subcriber
 * @param cb
 */
HTTPPubSub.prototype.subscribe = function(resource, subscriber, cb) {
	if (this._debug)
    console.log('Subscribe to resource ', resource);

  this._backend.addSubscriber(resource, subscriber, function(err) {
    if (cb) cb(err);
  });
}

/**
 * 
 * @param resource
 * @param subscriber
 */
HTTPPubSub.prototype.unsubscribe = function(resource, subscriber, cb) {
  if (this._debug)
    console.log('Unsubscribe from resource ', resource);

  this._backend.removeSubscriber(resource, subscriber, function(err) {
    if (cb) cb(err);  
  });
}

/**
 * Get subscribers for a resource
 *
 * @param resource
 */
HTTPPubSub.prototype.getSubscribers = function(resource, cb) {
  if (this._debug) {
    console.log('Get subscribers for', resource);
  }
  this._backend.getSubscribers(resource, function(err, result) {
    if (cb) cb(err, result);
  });
}

/**
 * Remove all the subscribers...
 */
HTTPPubSub.prototype.clearSubscribers = function(cb) {
  this._backend.removeSubscribers(function(err) {
    if (cb) cb(err);    
  });
}

/**
 * HTTP send the message to subscriber
 *
 * @param endpoint
 * @param message
 * @param cb
 * @private
 */
HTTPPubSub.prototype._send = function(endpoint, message, cb) {
  if (this._debug)
    console.log('Sending request to ', endpoint);

  var start = new Date();
  request.post(
    {
      url: endpoint,
      method: 'post',
      body: message,
      json: true
    },
    function(error, response, body) {
      if (cb) cb(error);
    });
}