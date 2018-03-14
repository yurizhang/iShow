'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = (0, _utils.createPropType)(function (props, propName, componentName) {
  var value = props[propName];

  if (!(value instanceof RegExp)) {
    return new Error('Invalid prop ' + propName + ' of ' + componentName + ', should be valid regex.');
  }
});