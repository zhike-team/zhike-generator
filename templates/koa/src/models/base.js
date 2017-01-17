'use strict';

/**
 * 基础模型
 */
let Model = module.exports = function() {};

/**
 * 获取
 * @param {Object} where 筛选条件
 * @param {Object} options 其它条件
 * @return {Object} 文档
 */
Model.prototype.get = function*(where, options) {
  options = options || {};

  // 生成查询条件
  let queryOptions = {
    where: where
  };
  for (let i in options) {
    queryOptions[i] = options[i];
  }
  queryOptions.raw = true;

  // 获取数据
  let data = yield this.orm.findOne(queryOptions);

  // 返回
  return data;
};


/**
 * 查找
 * @param {Object} where 筛选条件
 * @param {Object} options 其它条件
 * @return {Array} 文档
 */
Model.prototype.find = function*(where, options) {
  options = options || {};

  // 生成查询条件
  let queryOptions = {
    where: where
  };
  for (let i in options) {
    queryOptions[i] = options[i];
  }
  queryOptions.raw = true;

  // 获取数据
  let data = yield this.orm.findAll(queryOptions);

  // 返回
  return data;
};


/**
 * 创建
 * @param {Object} values 插入的数据
 * @param {Object} options 其它条件
 * @return {Object} 文档
 */
Model.prototype.create = function*(values, options) {
  // 其他条件
  options = options || {};

  // 创建记录
  let data = yield this.orm.create(values, options);

  // 返回
  return data;
};


/**
 * 更新
 * @param {Object} values 插入的数据
 * @param {Object} where  查询条件
 * @param {Object} tid  事务id
 * @return {Array} 文档
 */
Model.prototype.update = function*(values, where, tid) {
  // 其他条件
  let options = {};
  options.where = where;

  if (tid) {
    options.transaction = tid;
  }

  // 更新数据
  let data = yield this.orm.update(values, options);

  // 返回
  return data;
};
