'use strict';

// 引用
const co = require('co');
const path = require('path');
const fs = require('fs-extra');
const Sequelize = require('sequelize');
const consul = require('../consul');
const func = require('../src/common/func');

// 加载schemas
co(function *() {
  // 拉取配置
  let config = yield consul();

  // 连接数据库
  const db = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port,
    timezone: '+08:00',
    pool: {
      maxConnections: config.db.pool,
    },
    omitNull: true,
    logging: false,
  });

  const queryInterface = db.getQueryInterface();
  const tables = yield queryInterface.showAllTables();
  for (let i = 0; i < tables.length; i++) {
    if (tables[i] === 'SequelizeMeta' || (config.db.prefix && tables[i].substr(0, config.db.prefix.length) !== config.db.prefix)) {
      continue;
    }

    // 获取名称
    let name = config.db.prefix ? tables[i].substr(config.db.prefix.length) : tables[i];

    // 获取属性
    const attributes = yield queryInterface.describeTable(tables[i]);
    let schema = '';
    schema += '\'use strict\';\n\n';
    schema += 'let schema = db.define(\'' + func.toCamel(name) + '\', {\n';
    for (let field in attributes) {
      schema += '  ' + func.toCamel(field) + ': {\n';
      schema += '    type: \'' + attributes[field].type + '\',\n';
      schema += '    field: \'' + field + '\'\n';
      schema += '  }';
      schema += ',';
      schema += '\n';
    }
    schema += '}, {\n';
    schema += '  tableName: \'' + tables[i] + '\',\n';
    schema += '  createdAt: false,\n';
    schema += '  updatedAt: false\n';
    schema += '});\n\n'
    schema += 'module.exports = schema;\n';

    // 同步文件
    fs.mkdirsSync(path.join(__dirname, '../src/models/schemas'));
    fs.writeFileSync(path.join(__dirname, '../src/models/schemas', `${name}.js`), schema);
  }
}).then(function() {
  console.log('done');
  process.exit(0);
}).catch(function(err) {
  console.error(err.stack);
  process.exit(0);
});
