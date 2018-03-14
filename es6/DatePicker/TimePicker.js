var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'throttle-debounce/debounce';
import BasePicker from './BasePicker';
import TimePanel from './panel/TimePanel';
import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import '../Common/css/Date-picker.css';
function converSelectRange(props) {
  var selectableRange = [];
  if (props.selectableRange) {
    var ranges = props.selectableRange;
    var parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    var format = DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(function (range) {
      return parser(range, format);
    });
  }
  return selectableRange;
}

var TimePicker = function (_BasePicker) {
  _inherits(TimePicker, _BasePicker);

  _createClass(TimePicker, null, [{
    key: 'propTypes',

    // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
    get: function get() {
      var result = Object.assign({}, {
        // '18:30:00 - 20:30:00'
        // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
      }, BasePicker.propTypes);

      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props, 'time', {}));

    _this._onSelectionChange = debounce(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  _createClass(TimePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.inputRoot.refs.input.setSelectionRange(start, end);
      this.refs.inputRoot.refs.input.focus();
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      return React.createElement(TimePanel, Object.assign({}, props, {
        currentDate: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange,
        selectableRange: converSelectRange(props)
      }));
    }
  }]);

  return TimePicker;
}(BasePicker);

export default TimePicker;