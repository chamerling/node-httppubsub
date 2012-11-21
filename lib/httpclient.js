/**
 * HTTP Client
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var request = require('request');

/**
 *
 */
function subscribe(resource, endpoint, subscriber, callback) {
  request.post({
    // TODO manage '/' and endpoint provided with /subscribe
    url: endpoint + '/subscribe',
    method: 'post',
    body: { resource : resource, subscriber : subscriber},
    json: true
  },
  function(error, response, body) {
    if (callback) callback(error);
  });	
}
exports.subscribe = subscribe;

/**
 *
 */
function unsubscribe(resource, endpoint, subscriber, callback) {
  request.post({
    // TODO manage '/' and endpoint provided with /subscribe
    url: endpoint + '/unsubscribe',
    method: 'post',
    body: { resource : resource, subscriber : subscriber},
    json: true
  },
  function(error, response, body) {
    if (callback) callback(error);
  }); 
}
exports.unsubscribe = unsubscribe;

/**
 *
 */
function notify(resource, endpoint, message, callback) {
    // TODO manage '/' and endpoint provided with /notify
  var url = endpoint + '/notify/' + resource;
  request.post({
    url: url,
    method: 'post',
    body: message,
    json: true
  },
  function(error, response, body) {
    if (callback) callback(error);
  });
}
exports.notify = notify;