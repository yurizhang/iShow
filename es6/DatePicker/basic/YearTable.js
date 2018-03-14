var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../../Common/plugs/index.js'; //提供style, classname方法
import { hasClass, deconstructDate, SELECTION_MODES } from '../utils';
import '../../Common/css/Date-picker.css';

var YearTable = function (_Component) {
  _inherits(YearTable, _Component);

  function YearTable() {
    _classCallCheck(this, YearTable);

    return _possibleConstructorReturn(this, (YearTable.__proto__ || Object.getPrototypeOf(YearTable)).apply(this, arguments));
  }

  _createClass(YearTable, [{
    key: 'getCellStyle',
    value: function getCellStyle(year) {
      var _props = this.props,
          disabledDate = _props.disabledDate,
          value = _props.value,
          date = _props.date;

      var style = {};
      var ndate = new Date(date);

      ndate.setFullYear(year);
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, SELECTION_MODES.YEAR);
      style.current = value && deconstructDate(value).year === year;

      return style;
    }
  }, {
    key: 'handleYearTableClick',
    value: function handleYearTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        if (hasClass(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.props.onPick(+year);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var date = this.props.date;

      var startYear = Math.floor(deconstructDate(date).year / 10) * 10;

      return React.createElement(
        'table',
        { onClick: this.handleYearTableClick.bind(this), className: 'ishow-year-table' },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 0)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 1)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 1
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 2)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 2
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 3)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 3
              )
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 4)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 4
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 5)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 5
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 6)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 6
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 7)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 7
              )
            )
          ),
          React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 8)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 8
              )
            ),
            React.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 9)) },
              React.createElement(
                'a',
                { className: 'cell' },
                startYear + 9
              )
            ),
            React.createElement('td', null),
            React.createElement('td', null)
          )
        )
      );
    }
  }]);

  return YearTable;
}(Component);

export default YearTable;


YearTable.propTypes = {
  value: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func
};