'use strict';

const Consul = require('zhike-consul');

// *需要修改为项目中使用的数据库*
let database = 'athene';

module.exports = function*() {
  let consulConfig = {
    // *需要修改为项目中使用的配置项*
    keys: ['orderPrivate', 'mq', 'db', 'userService', 'payService']
  };
  
  switch (process.env.NODE_ENV) {
  case 'local':
    global.config = require('./config.local');
    return config;
  case 'development':
    consulConfig.host = 'dev.smartstudy.com';
    consulConfig.port = 8500;
    consulConfig.env = 'development';
    break;
  case 'test':
    consulConfig.host = 'confsrv.smartstudy.com';
    consulConfig.port = 8500;
    consulConfig.env = 'test';
    break;
  case 'production':
  default:
    consulConfig.host = 'confsrv.smartstudy.com';
    consulConfig.port = 8500;
    consulConfig.env = 'production';
  }
  
  let consul = new Consul(consulConfig.keys, consulConfig.host, consulConfig.port);
  let data = yield consul.pull(consulConfig.env);
  data.config.db = data.config.db[database];
  
  return data.config;
};

