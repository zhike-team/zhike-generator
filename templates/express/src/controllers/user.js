'use strict';

let User = function() {};
module.exports = new User();

User.prototype.getUser = function*(req, params, res) {
  return yield models.user.getUserById(params.id);
}