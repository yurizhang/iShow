'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstChild = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function firstChild(props) {
  var childrenArray = _react2.default.Children.toArray(props.children);
  return childrenArray[0] || null;
}

exports.firstChild = firstChild;