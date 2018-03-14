var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { pick } from '../Common/utils';
import PropTypes from 'prop-types';

import BasePicker from './BasePicker';
import DateRangePanel from './panel/DateRangePanel';

var DateRangePicker = function (_BasePicker) {
  _inherits(DateRangePicker, _BasePicker);

  _createClass(DateRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, { rangeSeparator: PropTypes.string }, BasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes, ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
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
      return React.createElement(DateRangePanel, Object.assign({}, props, {
        value: value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);

  return DateRangePicker;
}(BasePicker);

export default DateRangePicker;