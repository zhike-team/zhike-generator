'use strict';

let run = require('./run');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('Hello awesome!');
  });
  app.get('/user/:id', run(ctrls.user.getUser));
}
