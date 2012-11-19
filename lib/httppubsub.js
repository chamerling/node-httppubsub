/**
 *
 * Copyright(c) 2012 Christophe Hamerling <chamerling@linagora.com>
 * MIT Licensed
 */

var backend = require('./db')
  , request = require('request');

/**
 *
 * @param config
 * @constructor
 */
var HTTPPubSub = function HTTPPubSub(config) {
	this._config = config || { backend : 'dummy'};
  this._backend = backend.getClient(this._config);
}

exports.HTTPPubSub = HTTPPubSub;

/**
 *
 * @param resource
 * @param message
 * @param cb
 */
HTTPPubSub.prototype.publish = function(resource, message, cb) {
	console.log('Publish to resource ', resource);
  var subscribers = this._backend.getSubscribers(resource);

  // TODO : Use Async
  for(var subscriber in subscribers) {
    console.log('Subscriber : ' + subscriber + ' - ' + subscribers[subscriber]);
    this.send(subscribers[subscriber], message, function() {
      console.log('publish sent');
    });
  }
  if (cb) cb();
}

/**
 *
 * @param resource
 * @param subcriber
 * @param cb
 */
HTTPPubSub.prototype.subscribe = function(resource, subscriber, cb) {
	console.log('Subscribe to resource ', resource);
  this._backend.addSubscriber(resource, subscriber);
  if (cb) cb();
}

/**
 * HTTP send the message to subscriber
 *
 * @param endpoint
 * @param message
 * @param cb
 */
HTTPPubSub.prototype.send = function(endpoint, message, cb) {
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
      var diff = new Date().getTime() - start;
      if (error) {
        console.log('Error ', error);
      } else {
        console.log('Response for request (' + diff + ' ms) : ' + response.statusCode + ' : ', body);
      }
      if (cb) cb();
    });
}

/**
 * Get subscribers for a resource
 *
 * @param resource
 */
HTTPPubSub.prototype.getSubscribers = function(resource) {
  return this._backend.getSubscribers(resource);
}