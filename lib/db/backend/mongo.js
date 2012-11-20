/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var redis = require('redis');

var MongoClient = function MongoClient(config) {
  this.config = config;
}

exports.MongoClient = MongoClient;

/**
 *
 * @param resource
 * @param subscriber
 */
MongoClient.prototype.addSubscriber = function(resource, subscriber) {

}

/**
 *
 * @param resource
 */
MongoClient.prototype.getSubscribers = function(resource) {

}