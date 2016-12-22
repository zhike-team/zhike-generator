'use strict';

const fs = require('fs');
const co = require('co');
const formatJson = require('format-json-pretty');
const consul = require('../consul');

co(function*() {
  let config = yield consul();
  let fileExist = fs.existsSync(__dirname + '/../config.local.js');
  if (!fileExist) {
    let fileContent = "'use strict';\n\nmodule.exports = " + formatJson(config);
    fs.writeFileSync(__dirname + '/../config.local.js', fileContent);
  }
}).then(function() {
  console.log('done!');
}).catch(function(err) {
  console.log(err.stack);
});
