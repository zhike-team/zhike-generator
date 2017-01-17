'use strict';

let util = require('util');
let Base = require('./base');

let Model = function() {
  // this.orm = require('../schemas/user');
};
util.inherits(Model, Base);
module.exports = new Model();

Model.prototype.getUserById = function*(id) {
  let user = {
    id: id,
    name: 'awesome'
  };
  return user;
}
