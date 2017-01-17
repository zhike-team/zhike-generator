'use strict';

const assert = require('power-assert');

describe('Array', function() {
  beforeEach(function() {
    this.ary = [1,2,3];
  });
  describe('#indexOf()', function() {
    it('should return index when the value is present', function() {
      let zero = 0;
      assert(this.ary.indexOf(zero) === -1);
    });
    it('should return -1 when the value is not present', function() {
      let two = 2;
      assert(this.ary.indexOf(two) === -1);
    });
  });
});