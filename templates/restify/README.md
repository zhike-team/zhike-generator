## zhike-generator

1.安装依赖：`$ npm install`    

2.按照项目需求，修改consul.js中的数据库和配置项

3.同步数据结构：`$ npm run sync`     

4.启动服务：`$ npm start`    

### 如果有数据结构修改，统一使用sequelize的migrate命令

1.创建migrations文件：`$ npm run migrate create`     

2.修改新创建的migration文件，在src/models/migrations目录下

3.运行migration文件：`$ npm run migrate`    

4.撤销执行migrations文件：`$ npm run migrate undo`     

5.同步数据结构到src/models/schemas：`$ npm run sync`    

### 本地开发如何使用

1.`$ export NODE_ENV=local && npm start`，此时服务引用的配置文件是本地的config.local.js

### 测试

*推荐使用强大的power-assert断言库*

1.`$ npm run test`