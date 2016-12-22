'use strict';

const fs = require('fs');
const co = require('co');
const formatJson = require('format-json-pretty');
const consul = require('../consul');

co(function*() {
  let config = yield consul();
  let fileExist = fs.existsSync(__dirname + '/../config.db.json');
  if (!fileExist) {
    let fileContent = "'use strict';\n\nmodule.exports = " + formatJson(config.db);
    fs.writeFileSync(__dirname + '/../config.db.js', fileContent);
  }
}).then(function() {
  console.log('done!');
}).catch(function(err) {
  console.log(err.stack);
})
