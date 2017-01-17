'use strict';

let User = function() {};
module.exports = new User();

User.prototype.getUser = function*(ctx) {
  let data = yield models.user.getUserById(ctx.params.id);
  ctx.body = data;
}