'use strict';

let koa = require('koa');
let json = require('koa-json');
let router = require('./router');
let app = koa();

app.use(require('koa-bodyparser')());
app.use(json());

app.use(function*(next) {
  let start = new Date();
  console.log('%s %s', this.method, this.url);
  yield next;
  let ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(require('../middlewares/cross_domain'));

app.use(router.routes(), router.allowedMethods());

app.on('error', function(err, ctx) {
  console.error('Global:');
  console.error(err.stack);
});

app.listen(config.port, function() {
  console.log('server is running on ' + config.port);
});


