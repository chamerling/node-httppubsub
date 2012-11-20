/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var httpclient = require('./httpclient');

var Client = function Client(url) {
  this._url = url || 'http://localhost:3000';
}
exports.Client = Client;

/**
 * Subscribe to a pubsub channel
 */
Client.prototype.subscribe = function(resource, subscriber, callback) {
  httpclient.subscribe(resource, this._url, subscriber, function(err) {
    if (err) {
      console.log('Error while subscribing to resource ', err);
    } else {
      console.log('Subscribed to resource ', resource);
    }
    if (callback) callback(err);
  });
}

/**
 * Send a notification to the pubsub channel
 */
Client.prototype.notify = function(resource, message, callback) {
  httpclient.notify(resource, this._url, message, function(err) {
    if (err) {
      console.log('Error while notifying to resource ', err);
    } else {
      console.log('Notification sent');
    }
    if (callback) callback(err);
  });  
}