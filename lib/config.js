/**
 *
 * Copyright(c) 2012 Christophe Hamerling <christophe.hamerling@gmail.com>
 * MIT Licensed
 */
 
var fs = require('fs');
var default_config = {
  port : 3000,
  prefix : "",
  backend : {
    type : 'dummy'
  },
  debug : false
};

exports.config = {};

exports.loadConfig = function loadConfig(configPath) {
  var content = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  exports.config = content;
  return exports.config;
};

exports.default_config = default_config;