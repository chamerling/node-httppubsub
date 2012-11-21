/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */

var backends = require('./backend')
  , cache = null;

/**
 * Get a client defined from the configuration.
 */
exports.getClient = function getClient(config) {
  var backend = config.backend;

  if (!cache) {
    if (backend.type === 'redis') {
      console.log('Using the Redis backend...');
      cache = new backends.redis(config);
    } else if (backend.type === 'mongo') {
      console.log('Using the Mongo backend...');
      console.log('Mongo backend is not yet supported... Using the default InMemory backend');
      cache = new backends.dummy(config);
      //cache = new backends.mongo(config);
    } else {
      console.log('Using the default InMemory backend...');
      cache = new backends.dummy(config);
    }
  }
  return cache;
};