'use strict';

// 允许跨域
module.exports = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};
