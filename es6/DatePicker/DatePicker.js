var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { pick } from '../Common/utils';
import { SELECTION_MODES } from './utils';

import BasePicker from './BasePicker';
import DatePanel from './panel/DatePanel';
import '../Common/css/Date-picker.css';

var DatePicker = function (_BasePicker) {
  _inherits(DatePicker, _BasePicker);

  _createClass(DatePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, BasePicker.propTypes, pick(DatePanel.propTypes, ['value', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber', 'firstDayOfWeek', 'isShowTime']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var type = 'date';
    switch (props.selectionMode) {
      case SELECTION_MODES.YEAR:
        type = 'year';break;
      case SELECTION_MODES.MONTH:
        type = 'month';break;
      case SELECTION_MODES.WEEK:
        type = 'week';break;
      default:
        break;
    }
    return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props, type, {}));
  }

  _createClass(DatePicker, [{
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      return React.createElement(DatePanel, Object.assign({}, props, {
        value: state.value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);

  return DatePicker;
}(BasePicker);

export default DatePicker;