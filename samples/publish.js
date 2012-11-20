/**
 * Publish notifications to the pubsub stuff
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var request = require('request');
var client = require('../lib/client');

var c = new client.Client('http://localhost:3000');
var message = {
  foo : 'bar',
  bar : 'foo'
};

for (var i = 0; i < 100; i++) {
  c.notify('foo', message, function(err) {
    console.log(i + ' - notify sent, err : ', err);
  });
}