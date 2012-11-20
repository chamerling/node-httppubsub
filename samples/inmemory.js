/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var HTTPPubSub = require('../lib/httppubsub').HTTPPubSub;

var pub = new HTTPPubSub();
var resource = 'foo/bar';
pub.subscribe(resource, 'http://localhost:3000/subscriber', function(err) {
  if (err) {
    console.log('Error while subscribing to resource ' + resource, err);
    return -1;
  }
});

pub.subscribe(resource, 'http://localhost:3000/subscriber2', function(err) {
  if (err) {
    console.log('Error while subscribing to resource ' + resource, err);
    return -1;
  }
});

// push to resource
pub.publish(resource, {foo : 'bar', bar : 'foo'});


