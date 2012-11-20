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
    if (backend === 'redis') {
      cache = new backends.redis(config);
    } else if (backend === 'mongo') {
      cache = new backends.mongo(config);
    } else {
      console.log('Using the In Memory backend...');
      cache = new backends.dummy(config);
    }
  }
  return cache;
};