'use strict';

let router = require('koa-router')();

router.get('/', function*(next) {
  this.body = 'server is running';
});

router.get('user', '/user/:id', function*(next) {
  let ctx = this;
  yield ctrls.user.getUser(ctx);
});

module.exports = router;

