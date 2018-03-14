'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_propTypes2.default.range = _range2.default;
_propTypes2.default.regex = _regex2.default;

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
  }

  _createClass(Component, [{
    key: 'classNames',
    value: function classNames() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _classnames2.default)(args);
    }
  }, {
    key: 'className',
    value: function className() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.classNames.apply(this, args.concat([this.props.className]));
    }
  }, {
    key: 'style',
    value: function style(args) {
      return Object.assign({}, args, this.props.style);
    }
  }]);

  return Component;
}(_react2.default.Component);

exports.default = Component;

var View = exports.View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      var style = this.props.hasOwnProperty('show') && !this.props.show && {
        display: 'none'
      };

      if (_react2.default.Children.count(this.props.children) > 1) {
        return _react2.default.createElement(this.props.component, {
          style: Object.assign({}, this.props.style, style),
          className: this.props.className
        }, this.props.children);
      } else {
        return _react2.default.cloneElement(this.props.children, {
          style: Object.assign({}, this.props.children.props.style, style)
        });
      }
    }
  }]);

  return View;
}(Component);

/* eslint-disable */


View.propTypes = {
  show: _propTypes2.default.any,
  component: _propTypes2.default.string,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
/* eslint-enable */

View.defaultProps = {
  component: 'span'
};
View._typeName = 'View';

Component.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};