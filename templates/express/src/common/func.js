'use strict';

// 公共函数
let crypto = require('crypto');

// 提取字段
exports.getFields = function(data, fields, notSetNull) {
  let obj = {};
  for (let i = 0; i < fields.length; i++) {
    if (data[fields[i]] !== undefined) {
      obj[fields[i]] = data[fields[i]];
    } else {
      obj[fields[i]] = notSetNull ? undefined : '';
    }
  }
  return obj;
};

// 随机生成字符串
exports.randString = function(len) {
  len = len || 32;
  let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let res = '';
  for (let i = 0; i < len; i++) {
    res += dict[parseInt(Math.random() * dict.length)];
  }
  return res;
};

// 生成MD5
exports.md5 = function(s) {
  return crypto.createHash('md5').update(s, 'utf8').digest('hex');
};

// 将下划线命名转换为驼峰命名
exports.toCamel = function(name) {
  let newName = '';
  let underline = false;
  for (let i = 0; i < name.length; i++) {
    if (name[i] === '_' || name[i] === '-') {
      underline = true;
    } else {
      newName += underline ? name[i].toUpperCase() : name[i];
      underline = false;
    }
  };
  return newName;
};

// 获取IP地址
exports.getIp = function(req) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  if (ip.match(/\d+\.\d+\.\d+\.\d+/)) {
    ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
  } else {
    ip = '0.0.0.0';
  }
  return ip;
};
