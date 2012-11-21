/**
 * Redis storage for subscritpions. Each subscription is stored in a set where the key is
 * subcriptions_RESOURCE : RESOURCE is the resource the subscribers subcribed to.
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

 var redis = require('redis');

var RedisClient = function RedisClient(config) {
  this._config = config || {};
  this._client = this._getClient();
}

exports.RedisClient = RedisClient;

/**
 * Add a subscriber
 *
 * @param resource
 * @param subscriber
 * @param callback
 */
RedisClient.prototype.addSubscriber = function(resource, subscriber, callback) {
  this._client.sadd('subscriptions_' + resource, subscriber, redis.print);
}

/**
 * Remove a subscriber from the subscribers list
 */
RedisClient.prototype.removeSubscriber = function(resource, subscriber, callback) {
  //this._client.sadd('subscriptions_' + resource, subscriber, redis.print);
  this._client.srem('subscriptions_' + resource, subscriber, function(err) {
    if (callback) callback(err);
  });
}

/**
 * Remove all the subscribers
 */
RedisClient.prototype.removeSubscribers = function(callback) {
  // TODO : Remove all the keys startign with subscriptions_
  if (callback) callback(null);
}

/**
 * Get all the subscribers for a resource
 *
 * @param resource
 * @param callback
 */
RedisClient.prototype.getSubscribers = function(resource, callback) {
  if (callback) {
    this._client.smembers('subscriptions_' + resource, function(err, subscriptions) {
      callback(err, subscriptions);
    });
  }
}

/**
 * Get the real redis client
 */
RedisClient.prototype._getClient = function() {
 var client = redis.createClient(this._config.backend.port, this._config.backend.host);

 if (this._config.password) {
   client.auth(this._config.password);
 }

 return client;
};
