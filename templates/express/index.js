'use strict';

const co = require('co');
const consul = require('./consul');

co(function*() {
  // 拉取配置
  let config = yield consul();
  // 加载全局变量
  global.config = config;
  require('./src/common/global');
  console.dir(config, {colors: true, depth: null});
  console.dir(`env = ${process.env.NODE_ENV}`, {colors: true, depth: null});
}).then(function() {
  // 启动服务
  require('./src/server');
});
