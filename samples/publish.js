/**
 * Publish notifications to the pubsub stuff
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var request = require('request')
  , uuid = require('node-uuid');

var client = require('../lib/client');

var url = 'http://localhost:3000/api/v1/monitoring/wsn/';
var i = 0;
var errors = 0;
var size = 1000;

var start = new Date();
var id = setInterval(function() {

  var message = {
    data : 'foobar',
    count : i
  };
  
  console.log('Sending notify message # ' + i + ' : ' , message);
  
  i++;

  if (i == size) {
    // kill me...
    var diff = new Date() - start;
    console.log('>>> Sent ' + size + ' messages in ' + diff + ' ms, nb errors ' + errors);
    clearInterval(id);
  }

  var c = new client.Client('http://localhost:3000');
  c.notify('foo', message, function(err) {
    if (err) {
      console.log('Error ', err);
      errors ++;
    }
  });
}, 20);

