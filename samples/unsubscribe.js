/**
 * Publish notifications to the pubsub stuff
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var request = require('request')
  , uuid = require('node-uuid');

var client = require('../lib/client');

var c = new client.Client('http://localhost:3000');
c.unsubscribe('foo', 'http://localhost:3003/', function(err) {
  if (err) {
    console.log('Error ', err);
  }
});
