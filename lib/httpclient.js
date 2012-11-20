/**
 * HTTP Client
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var request = require('request');

function subscribe(resource, endpoint, subscriber, callback) {
  request.post({
    // TODO manage '/'
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

function notify(resource, endpoint, message, callback) {
  // TODO manage '/'
  var url = endpoint + '/notify/' + resource;
  console.log('Send to ' + url)
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