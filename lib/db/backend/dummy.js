/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var DummyClient = function DummyClient(config) {
  this.config = config;
  this.subscribers = {};
}

exports.DummyClient = DummyClient;

/**
 *
 * @param resource
 * @param subscriber
 */
DummyClient.prototype.addSubscriber = function(resource, subscriber, callback) {
  if (this.subscribers[resource]) {
    this.subscribers[resource].push(subscriber);
  } else {
    this.subscribers[resource] = [];
    this.subscribers[resource].push(subscriber);
  }
  if (callback) callback();
}

/**
 * Remove a subscriber from the subscribers list
 */
DummyClient.prototype.removeSubscriber = function(resource, subscriber, callback) {
  //this._client.sadd('subscriptions_' + resource, subscriber, redis.print);
}

/**
 * Remove all the subscribers
 */
DummyClient.prototype.removeSubscribers = function(callback) {
  this.subscribers = {};
  if (callback) callback(null);
}

/**
 *
 * @param resource
 */
DummyClient.prototype.getSubscribers = function(resource, callback) {
  if (callback) {
    callback(null, this.subscribers[resource])
  }
}