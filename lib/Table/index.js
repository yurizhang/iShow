'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TableStore = require('./TableStore');

var _TableStore2 = _interopRequireDefault(_TableStore);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TableStore2.default.Column = _TableColumn2.default;

exports.default = _TableStore2.default;