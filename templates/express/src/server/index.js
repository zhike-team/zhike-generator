'use strict';

let express = require('express');
let router = require('./router');
let app = express();

app.use(require('compression')());
app.use(require('connect-timeout')(config.timeout * 1000, {
  respond: false
}));
app.use(require('body-parser').urlencoded({
  limit: '500kb',
  extended: false
}));
app.use(require('cookie-parser')());

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

process.on('uncaughtException', function(err) {
  console.error('Global');
  console.error(err);
  process.exit(0);
});

app.listen(config.port, function() {
  console.log('server is running on ' + config.port);
});


