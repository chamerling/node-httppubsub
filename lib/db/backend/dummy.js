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
DummyClient.prototype.addSubscriber = function(resource, subscriber) {
  if (this.subscribers[resource]) {
    this.subscribers[resource].push(subscriber);
  } else {
    this.subscribers[resource] = [];
    this.subscribers[resource].push(subscriber);
  }
  console.log("Subscribers, ", this.subscribers);
}

/**
 *
 * @param resource
 */
DummyClient.prototype.getSubscribers = function(resource) {
  return this.subscribers[resource];
}