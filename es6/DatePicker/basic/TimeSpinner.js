var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import debounce from 'throttle-debounce/debounce';
import PropTypes from 'prop-types';
import { default as Component } from '../../Common/plugs/index.js'; //提供style, classname方法
import { getRangeHours } from '../utils';
import { Scrollbar } from '../../Scrollbar';
import '../../Common/css/Date-picker.css';

function withIndex(arr) {
  return arr.map(function (e, i) {
    return e;
  });
}

function range(end) {
  var r = [];
  for (var i = 0; i < end; i++) {
    r.push(i);
  }
  return r;
}

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};
var validateHour = function validateHour(value) {
  return isNumber(value) && value >= 0 && value <= 23;
};
var validateMinOrSec = function validateMinOrSec(value) {
  return isNumber(value) && value >= 0 && value <= 59;
};

function propsToState(props) {
  var hours = props.hours,
      minutes = props.minutes,
      seconds = props.seconds,
      selectableRange = props.selectableRange;

  var state = {};
  var setOnValid = function setOnValid(isValid, cb) {
    return isValid && cb(state);
  };
  setOnValid(validateHour(hours), function (state) {
    return state.hours = hours;
  });
  setOnValid(validateMinOrSec(minutes), function (state) {
    return state.minutes = minutes;
  });
  setOnValid(validateMinOrSec(seconds), function (state) {
    return state.seconds = seconds;
  });
  state.hoursList = getRangeHours(selectableRange);
  state.minutesLisit = withIndex(range(60));
  state.secondsList = withIndex(range(60));
  return state;
}

var SCROLL_AJUST_VALUE = 85;
var calcScrollTop = function calcScrollTop(value) {
  return Math.max(0, (value - 2.5) * 32 + SCROLL_AJUST_VALUE);
};

var TimeSpinner = function (_Component) {
  _inherits(TimeSpinner, _Component);

  _createClass(TimeSpinner, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        isShowSeconds: PropTypes.bool,
        //[[datefrom, dateend]...]
        selectableRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))),
        /*
        type: one of [hours, minutes, seconds]
         onChange: ({type})=>()
        */
        onChange: PropTypes.func.isRequired,
        onSelectRangeChange: PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isShowSeconds: true,
        onSelectRangeChange: function onSelectRangeChange() {}
      };
    }
  }]);

  function TimeSpinner(props) {
    _classCallCheck(this, TimeSpinner);

    var _this = _possibleConstructorReturn(this, (TimeSpinner.__proto__ || Object.getPrototypeOf(TimeSpinner)).call(this, props));

    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_this);
    _this.handleScroll = debounce(20, _this._handleScroll.bind(_this));
    return _this;
  }

  _createClass(TimeSpinner, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.ajustScrollTop(this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState(propsToState(nextProps), function () {
        _this2.ajustScrollTop(_this2.state);
      });
    }
  }, {
    key: 'emitSelectRange',
    value: function emitSelectRange(type) {
      var onSelectRangeChange = this.props.onSelectRangeChange;

      if (type === 'hours') {
        onSelectRangeChange(0, 3);
      } else if (type === 'minutes') {
        onSelectRangeChange(3, 5);
      } else if (type === 'seconds') {
        onSelectRangeChange(6, 9);
      }
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll(_type) {
      var value = Math.min(Math.floor((this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
      this.handleChange(_type, value);
    }

    // type: hours, minutes, seconds

  }, {
    key: 'handleChange',
    value: function handleChange(type, value, disabled) {
      var _this3 = this;

      if (disabled) return;
      this.setState({
        type: value
      });
      var changed = {};
      changed[type] = value;
      this.setState({}, function () {
        _this3.ajustScrollTop(_this3.state);
      });
      this.props.onChange(changed);
    }
  }, {
    key: '_ajustScrollTop',
    value: function _ajustScrollTop(_ref) {
      var hours = _ref.hours,
          minutes = _ref.minutes,
          seconds = _ref.seconds;

      if (hours != null) {
        this.refs.hours.refs.wrap.scrollTop = calcScrollTop(hours);
      }
      if (minutes != null) {
        this.refs.minutes.refs.wrap.scrollTop = calcScrollTop(minutes);
      }
      if (seconds != null) {
        this.refs.seconds.refs.wrap.scrollTop = calcScrollTop(seconds);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          hoursList = _state.hoursList,
          minutesLisit = _state.minutesLisit,
          secondsList = _state.secondsList,
          hours = _state.hours,
          minutes = _state.minutes,
          seconds = _state.seconds;
      var isShowSeconds = this.props.isShowSeconds;


      return React.createElement(
        'div',
        {
          className: this.classNames('ishow-time-spinner', {
            'has-seconds': isShowSeconds
          })
        },
        React.createElement(
          Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('hours');
            },
            onWheel: function onWheel() {
              _this4.handleScroll('hours');
            },
            ref: 'hours',
            className: 'ishow-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'ishow-time-spinner__list',
            viewComponent: 'ul'
          },
          hoursList.map(function (disabled, idx) {
            return React.createElement(
              'li',
              {
                key: idx,
                onClick: function onClick() {
                  return _this4.handleChange('hours', idx, disabled);
                },
                className: _this4.classNames('ishow-time-spinner__item', {
                  active: idx === hours,
                  disabled: disabled
                })
              },
              idx
            );
          })
        ),
        React.createElement(
          Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('minutes');
            },
            onWheel: function onWheel() {
              return _this4.handleScroll('minutes');
            },
            ref: 'minutes',
            className: 'ishow-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'ishow-time-spinner__list',
            viewComponent: 'ul'
          },
          minutesLisit.map(function (disabled, idx) {
            return React.createElement(
              'li',
              {
                key: idx,
                onClick: function onClick() {
                  return _this4.handleChange('minutes', idx);
                },
                className: _this4.classNames('ishow-time-spinner__item', {
                  active: idx === minutes
                })
              },
              idx
            );
          })
        ),
        isShowSeconds && React.createElement(
          Scrollbar,
          {
            onMouseEnter: function onMouseEnter() {
              return _this4.emitSelectRange('seconds');
            },
            onWheel: function onWheel() {
              return _this4.handleScroll('seconds');
            },
            ref: 'seconds',
            className: 'ishow-time-spinner__wrapper',
            wrapStyle: { maxHeight: 'inherit' },
            viewClass: 'ishow-time-spinner__list',
            viewComponent: 'ul'
          },
          secondsList.map(function (disabled, idx) {
            return React.createElement(
              'li',
              {
                key: idx,
                onClick: function onClick() {
                  return _this4.handleChange('seconds', idx);
                },
                className: _this4.classNames('ishow-time-spinner__item', {
                  active: idx === seconds
                })
              },
              idx
            );
          })
        )
      );
    }
  }]);

  return TimeSpinner;
}(Component);

export default TimeSpinner;