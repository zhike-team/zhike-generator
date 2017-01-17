'use strict';

let log = require('util').log;

module.exports = function (action, options) {
  options = options || {};

  return (req, res, next) => {
    let cntTime = new Date();
    log(`${req.method} - ${req.url}`);

    let errorHandle = function (err) {
      console.log(err.stack);
      err.code = config.errorPrefix + (err.code || 1);
      res.send({
        code: err.code,
        msg: err.msg || '未知错误'
      });
    };

    // 不需要自动返回JSON
    if (options.raw) {
      co(function*() {
        yield action(req, res)
      }).then(() => {
      }, errorHandle);
      return;
    }

    co(function*() {
      let params = Object.assign({}, req.method === 'GET' ? req.query : req.body, req.params);
      let data = yield action(req, params, res);
      return data;
    }).then(function (data) {
      log(`${req.method} - ${req.url} - ${new Date().getTime() - cntTime.getTime()}ms`);
      res.send({
        code: 0,
        data: data
      });
    }, errorHandle);
  };
};
