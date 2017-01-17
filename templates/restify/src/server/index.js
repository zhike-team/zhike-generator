'use strict';

let restify = require('restify');
let router = require('./router');
let app = restify.createServer({
  name: 'restify'
});

app.use(require('compression')());
app.use(restify.queryParser({plainObjects: false}));
app.use(require('connect-timeout')(config.timeout * 1000, {
  respond: false
}));
app.use(restify.bodyParser({
  maxBodySize: 0,
  mapParams: true,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: false,
  multiples: true
}));
app.use(require('restify-cookies').parse);

app.use(require('../middlewares/cross_domain'));

app.use(function(req, res, next) {
  req.on('timeout', function () {
    res.send({
      code: 3,
      msg: error[3]
    });
    process.nextTick(function () {
      res.send = res.end = function () {
      };
    });
  });
  next();
});

router(app);

app.on('uncaughtException', function (req, res, route, err) {
  console.error(req.url, err.stack || err);
  res.send(err);
});

app.listen(config.port, function() {
  console.log('server is running on ' + config.port);
});


