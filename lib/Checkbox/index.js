'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _CheckBoxGroup = require('./CheckBoxGroup');

var _CheckBoxGroup2 = _interopRequireDefault(_CheckBoxGroup);

var _CheckBoxButton = require('./CheckBoxButton');

var _CheckBoxButton2 = _interopRequireDefault(_CheckBoxButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_CheckBox2.default.Group = _CheckBoxGroup2.default;
_CheckBox2.default.Button = _CheckBoxButton2.default;

exports.default = _CheckBox2.default;