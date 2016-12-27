'use strict';

const fs = require('fs');
const co = require('co');
const cp = require('child_process');
const thunkify = require('thunkify-wrap');
const consul = require('../consul');

let operation = process.argv[2];

co(function*() {
  let config = yield consul();
  let tempPath = __dirname + '/config.db.json';
  fs.writeFileSync(tempPath, JSON.stringify(config.db));
  let exec = thunkify(cp.exec);
  let cmdStr = ' --migrations-path src/models/migrations --config bin/config.db.json';
  let execResult;
  switch (operation) {
  case 'create':
    execResult = yield exec('sequelize migration:create' + cmdStr);
    break;
  case 'undo':
    execResult = yield exec('sequelize db:migrate:undo' + cmdStr);
    break;
  default:
    execResult = yield exec('sequelize db:migrate' + cmdStr);
  }
  console.log(execResult[0]);
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }
}).then(function() {
  console.log('done!');
}).catch(function(err) {
  console.log(err.stack);
})
