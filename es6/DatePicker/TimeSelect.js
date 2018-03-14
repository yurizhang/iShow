var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import BasePicker from './BasePicker';
import TimeSelectPanel from './panel/TimeSelectPanel';
import '../Common/css/Date-picker.css';

var TimeSelect = function (_BasePicker) {
  _inherits(TimeSelect, _BasePicker);

  _createClass(TimeSelect, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, {
        start: PropTypes.string,
        end: PropTypes.string,
        step: PropTypes.string,
        minTime: PropTypes.instanceOf(Date)
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

  function TimeSelect(props) {
    _classCallCheck(this, TimeSelect);

    // props, type, state
    return _possibleConstructorReturn(this, (TimeSelect.__proto__ || Object.getPrototypeOf(TimeSelect)).call(this, props, 'timeselect', {}));
  }

  _createClass(TimeSelect, [{
    key: 'isDateValid',
    value: function isDateValid(value) {
      return _get(TimeSelect.prototype.__proto__ || Object.getPrototypeOf(TimeSelect.prototype), 'isDateValid', this).call(this, value) && TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps());
    }
  }, {
    key: 'panelProps',
    value: function panelProps(props) {
      var ps = props || this.props;
      var minTime = this.dateToStr(this.props.minTime);
      return Object.assign({}, ps, { minTime: minTime });
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      var value = this.dateToStr(state.value);
      return React.createElement(TimeSelectPanel, Object.assign({}, this.panelProps(props), {
        value: value,
        onPicked: this.onPicked.bind(this),
        dateParser: function dateParser(str) {
          var r = _this2.parseDate(str);
          return r;
        }
      }));
    }
  }]);

  return TimeSelect;
}(BasePicker);

export default TimeSelect;