'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

var _locale = require('../../Common/locale');

var _locale2 = _interopRequireDefault(_locale);

require('../../Common/css/Date-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var MonthTable = function (_Component) {
  _inherits(MonthTable, _Component);

  function MonthTable() {
    _classCallCheck(this, MonthTable);

    return _possibleConstructorReturn(this, (MonthTable.__proto__ || Object.getPrototypeOf(MonthTable)).apply(this, arguments));
  }

  _createClass(MonthTable, [{
    key: 'getCellStyle',
    value: function getCellStyle(month) {
      var _props = this.props,
          date = _props.date,
          disabledDate = _props.disabledDate,
          value = _props.value;

      var style = {};
      var ndate = new Date(date);
      ndate.setMonth(month);
      // in the element repo, you could see the original code that only disable current month only when all days contains in this month are disabled
      // which i don't think is a good design, so i changed disabledDate callback with an additional type param to solve this kind issue.
      // so the caller can handle different picker views on each switch arm condition.
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, _utils.SELECTION_MODES.MONTH);
      style.current = value && (0, _utils.deconstructDate)(value).month === month;
      return style;
    }
  }, {
    key: 'handleMonthTableClick',
    value: function handleMonthTableClick(event) {
      var target = event.target;
      if (target.tagName !== 'A') return;
      if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
      var column = target.parentNode.cellIndex;
      var row = target.parentNode.parentNode.rowIndex;
      var month = row * 4 + column;

      this.props.onPick(month);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var $t = _locale2.default.t;
      var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

      return _react2.default.createElement(
        'table',
        { onClick: this.handleMonthTableClick.bind(this), className: 'ishow-month-table' },
        _react2.default.createElement(
          'tbody',
          null,
          months.map(function (key, idx) {
            return _react2.default.createElement(
              'td',
              { className: _this2.classNames(_this2.getCellStyle(idx)), key: idx },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                $t('el.datepicker.months.' + key)
              )
            );
          }).reduce(function (col, item) {
            var tararr = void 0;
            if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
              col.unshift([]);
            }
            tararr = col[0];
            tararr.push(item);
            return col;
          }, []).reverse().map(function (e, idx) {
            return _react2.default.createElement(
              'tr',
              { key: idx },
              e
            );
          })
        )
      );
    }
  }]);

  return MonthTable;
}(_index2.default);

exports.default = MonthTable;


MonthTable.propTypes = {
  // current date, specific to view
  date: _propTypes2.default.instanceOf(Date).isRequired,
  // user picked value, value: Date|null
  value: _propTypes2.default.instanceOf(Date),
  onPick: _propTypes2.default.func.isRequired,
  // (Date)=>boolean
  disabledDate: _propTypes2.default.func
};