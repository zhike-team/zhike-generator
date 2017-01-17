'use strict';

// 引用
let fs = require('fs');
let path = require('path');

// 全局变量
global.constant = require('./constant');
global.error = require('./error');
global.func = require('./func');
global.co = require('co');

// 数据库
global.Sequelize = require('sequelize');
global.db = new global.Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  host: config.db.host,
  port: config.db.port,
  timezone: '+08:00',
  logging: undefined,
  pool: {
    maxConnections: config.db.pool
  }
});

// 全局错误
global.Exception = function(code, msg) {
  this.code = code;
  this.msg = msg || error[code];
  this.stack = new Error(this.code + ': ' + this.msg).stack;
};

// 加载所有控制器
global.ctrls = {};
let dir = fs.readdirSync(__dirname + '/../controllers');
for (let i = 0; i < dir.length; i++) {
  if (path.extname(dir[i]) !== '.js') continue;
  ctrls[func.toCamel(path.basename(dir[i], '.js'))] = require(__dirname + '/../controllers/' + dir[i]);
}

// 加载所有模型
global.models = {};
dir = fs.readdirSync(__dirname + '/../models');
for (let i = 0; i < dir.length; i++) {
  if (path.extname(dir[i]) !== '.js') continue;
  models[func.toCamel(path.basename(dir[i], '.js'))] = require(__dirname + '/../models/' + dir[i]);
}

