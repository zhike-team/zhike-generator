'use strict';

module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": "off",
    "no-console": "off",
    "strict": "warn",
    "require-yield": "warn",
    "no-unused-vars": "off",
    "no-undef": "off"
    },
  "globals": {
    "constant": true,
    "error": true,
    "config": true,
    "models": true,
    "func": true,
    "db": true,
    "Sequelize": true,
    "cache": true,
    "oss": true,
    "Exception": true,
    "ctrls": true,
    "co": true
  }
}