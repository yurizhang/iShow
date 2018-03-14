'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

require('../Common/css/radio-group.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
  }

  _createClass(RadioGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { ref: 'RadioGroup', style: this.style(), className: this.className('ishow-radio-group') },
        _react2.default.Children.map(this.props.children, function (element) {
          if (!element) {
            return null;
          }

          var elementType = element.type.elementType;

          if (elementType !== 'Radio' && elementType !== 'RadioButton') {
            return null;
          }

          return _react2.default.cloneElement(element, Object.assign({}, element.props, {
            onChange: _this2.onChange.bind(_this2),
            model: _this2.props.value,
            size: _this2.props.size
          }));
        })
      );
    }
  }]);

  return RadioGroup;
}(_index2.default);

exports.default = RadioGroup;


RadioGroup.childContextTypes = {
  component: _propTypes2.default.any
};

RadioGroup.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  fill: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};