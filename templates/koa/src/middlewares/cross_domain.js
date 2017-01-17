'use strict';

// 允许跨域
module.exports = function*(next) {
  this.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
  });
  if (this.method == 'OPTIONS') {
    this.status = 200;
  } 
  yield next;
};
