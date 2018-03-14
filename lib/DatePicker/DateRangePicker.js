'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../Common/utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _DateRangePanel = require('./panel/DateRangePanel');

var _DateRangePanel2 = _interopRequireDefault(_DateRangePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRangePicker = function (_BasePicker) {
  _inherits(DateRangePicker, _BasePicker);

  _createClass(DateRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, { rangeSeparator: _propTypes2.default.string }, _BasePicker3.default.propTypes,
      // default value is been defined in ./constants file
      (0, _utils.pick)(_DateRangePanel2.default.propTypes, ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, _BasePicker3.default.defaultProps);
      return result;
    }
  }]);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    return _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props, 'daterange', {}));
  }

  _createClass(DateRangePicker, [{
    key: 'getFormatSeparator',
    value: function getFormatSeparator() {
      return this.props.rangeSeparator;
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var value = state.value;
      if (value instanceof Date) {
        value = [value, null];
      }
      return _react2.default.createElement(_DateRangePanel2.default, _extends({}, props, {
        value: value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);

  return DateRangePicker;
}(_BasePicker3.default);

exports.default = DateRangePicker;