'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

var _TimeSpinner = require('../basic/TimeSpinner');

var _TimeSpinner2 = _interopRequireDefault(_TimeSpinner);

var _locale = require('../../Common/locale');

var _locale2 = _interopRequireDefault(_locale);

var _PopperBase2 = require('./PopperBase');

require('../../Common/css/Date-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MIN_TIME = (0, _utils.parseDate)('00:00:00', 'HH:mm:ss');
var MAX_TIME = (0, _utils.parseDate)('23:59:59', 'HH:mm:ss');

var isDisabled = function isDisabled(minTime, maxTime) {
  var minValue = minTime.getHours() * 3600 + minTime.getMinutes() * 60 + minTime.getSeconds();
  var maxValue = maxTime.getHours() * 3600 + maxTime.getMinutes() * 60 + maxTime.getSeconds();

  return minValue > maxValue;
};

var calcTime = function calcTime(time) {
  time = Array.isArray(time) ? time : [time];
  var minTime = time[0] || new Date();
  var date = new Date();
  date.setHours(date.getHours() + 1);
  var maxTime = time[1] || date;

  if (minTime > maxTime) return calcTime();
  return { minTime: minTime, maxTime: maxTime };
};

var mapPropsToState = function mapPropsToState(props) {
  var currentDates = props.currentDates,
      format = props.format;

  var _calcTime = calcTime(currentDates),
      minTime = _calcTime.minTime,
      maxTime = _calcTime.maxTime;

  var state = {
    format: format || 'HH:mm:ss',
    minTime: minTime,
    maxTime: maxTime,
    minSelectableRange: [[MIN_TIME, maxTime]],
    maxSelectableRange: [[minTime, MAX_TIME]],
    btnDisabled: isDisabled(minTime, maxTime)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

  return state;
};

var TimeRangePanel = function (_PopperBase) {
  _inherits(TimeRangePanel, _PopperBase);

  _createClass(TimeRangePanel, null, [{
    key: 'propTypes',

    //state: any;

    get: function get() {
      return Object.assign({
        pickerWidth: _propTypes2.default.number,
        currentDates: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date| Date[] |null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: _propTypes2.default.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: _propTypes2.default.func.isRequired,
        // (start, end)=>(), index range indicate which field [hours, minutes, seconds] changes
        onSelectRangeChange: _TimeSpinner2.default.propTypes.onSelectRangeChange
      }, _PopperBase2.PopperBase.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        popperMixinOption: {}
      };
    }
  }]);

  function TimeRangePanel(props) {
    _classCallCheck(this, TimeRangePanel);

    var _this = _possibleConstructorReturn(this, (TimeRangePanel.__proto__ || Object.getPrototypeOf(TimeRangePanel)).call(this, props));

    _this.state = Object.assign({
      visible: false,
      width: 0
    }, mapPropsToState(props));
    return _this;
  }

  _createClass(TimeRangePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }

    // type = hours | minutes | seconds
    // date: {type: number}

  }, {
    key: 'handleChange',
    value: function handleChange(date, field) {
      var ndate = this.state[field];

      if (date.hours !== undefined) {
        ndate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        ndate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        ndate.setSeconds(date.seconds);
      }

      var state = _defineProperty({}, field, ndate);

      var _state2 = this.state,
          minTime = _state2.minTime,
          maxTime = _state2.maxTime;

      state.minSelectableRange = [[MIN_TIME, maxTime]];
      state.maxSelectableRange = [[minTime, MAX_TIME]];

      state.minTime = (0, _utils.limitRange)(minTime, state.minSelectableRange);
      state.maxTime = (0, _utils.limitRange)(maxTime, state.maxSelectableRange);

      this.setState(state);
      this.handleConfirm(true);
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _state3 = this.state,
          minTime = _state3.minTime,
          maxTime = _state3.maxTime;
      var onPicked = this.props.onPicked;


      onPicked([minTime, maxTime], isKeepPannelOpen);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state4 = this.state,
          isShowSeconds = _state4.isShowSeconds,
          minTime = _state4.minTime,
          maxTime = _state4.maxTime,
          btnDisabled = _state4.btnDisabled,
          minSelectableRange = _state4.minSelectableRange,
          maxSelectableRange = _state4.maxSelectableRange;
      var _onSelectRangeChange = this.props.onSelectRangeChange;

      var $t = _locale2.default.t;

      var maxHours = maxTime.getHours();
      var maxMinutes = maxTime.getMinutes();
      var maxSeconds = maxTime.getSeconds();
      var minHours = minTime.getHours();
      var minMinutes = minTime.getMinutes();
      var minSeconds = minTime.getSeconds();
      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'ishow-time-range-picker ishow-picker-panel',
          style: { minWidth: '330px' }
        },
        _react2.default.createElement(
          'div',
          { className: 'ishow-time-range-picker__content' },
          _react2.default.createElement(
            'div',
            { className: 'ishow-time-range-picker__cell' },
            _react2.default.createElement(
              'div',
              { className: 'ishow-time-range-picker__header' },
              $t('el.datepicker.startTime')
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.classNames('ishow-time-range-picker__body ishow-time-panel__content', { 'has-seconds': isShowSeconds })
              },
              _react2.default.createElement(_TimeSpinner2.default, {
                ref: 'minSpinner',
                onChange: function onChange(date) {
                  return _this2.handleChange(date, 'minTime');
                },
                isShowSeconds: isShowSeconds,
                hours: minHours,
                minutes: minMinutes,
                seconds: minSeconds,
                selectableRange: minSelectableRange,
                onSelectRangeChange: _onSelectRangeChange
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'ishow-time-range-picker__cell' },
            _react2.default.createElement(
              'div',
              { className: 'ishow-time-range-picker__header' },
              $t('el.datepicker.endTime')
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.classNames('ishow-time-range-picker__body ishow-time-panel__content', { 'has-seconds': isShowSeconds })
              },
              _react2.default.createElement(_TimeSpinner2.default, {
                ref: 'maxSpinner',
                onChange: function onChange(date) {
                  return _this2.handleChange(date, 'maxTime');
                },
                isShowSeconds: isShowSeconds,
                hours: maxHours,
                minutes: maxMinutes,
                seconds: maxSeconds,
                selectableRange: maxSelectableRange,
                onSelectRangeChange: function onSelectRangeChange(start, end) {
                  return _onSelectRangeChange(start + 11, end + 11);
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'ishow-time-panel__footer' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'ishow-time-panel__btn cancel',
              onClick: function onClick() {
                return _this2.props.onCancel();
              }
            },
            $t('el.datepicker.cancel')
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'ishow-time-panel__btn confirm',
              onClick: function onClick() {
                return _this2.handleConfirm();
              },
              disabled: btnDisabled
            },
            $t('el.datepicker.confirm')
          )
        )
      );
    }
  }]);

  return TimeRangePanel;
}(_PopperBase2.PopperBase);

exports.default = TimeRangePanel;