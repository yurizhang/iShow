var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'throttle-debounce/debounce';
import BasePicker from './BasePicker';
import TimeRangePanel from './panel/TimeRangePanel';
import '../Common/css/Date-picker.css';

var TimeRangePicker = function (_BasePicker) {
  _inherits(TimeRangePicker, _BasePicker);

  _createClass(TimeRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, { rangeSeparator: PropTypes.string }, BasePicker.propTypes);
      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function TimeRangePicker(props) {
    _classCallCheck(this, TimeRangePicker);

    var _this = _possibleConstructorReturn(this, (TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call(this, props, 'timerange', {}));

    _this._onSelectionChange = debounce(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  _createClass(TimeRangePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.inputRoot.refs.input.setSelectionRange(start, end);
      this.refs.inputRoot.refs.input.focus();
    }
  }, {
    key: 'getFormatSeparator',
    value: function getFormatSeparator() {
      return this.props.rangeSeparator;
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      return React.createElement(TimeRangePanel, Object.assign({}, props, {
        currentDates: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange
      }));
    }
  }]);

  return TimeRangePicker;
}(BasePicker);

export default TimeRangePicker;