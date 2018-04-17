'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dom = require('../../Common/utils/dom');

var _Scrollbar = require('../../Scrollbar');

var _PopperBase2 = require('./PopperBase');

require('../../Common/css/Date-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSelectPanel = function (_PopperBase) {
  _inherits(TimeSelectPanel, _PopperBase);

  function TimeSelectPanel() {
    _classCallCheck(this, TimeSelectPanel);

    return _possibleConstructorReturn(this, (TimeSelectPanel.__proto__ || Object.getPrototypeOf(TimeSelectPanel)).apply(this, arguments));
  }

  _createClass(TimeSelectPanel, [{
    key: 'handleClick',
    value: function handleClick(item) {
      var _props = this.props,
          onPicked = _props.onPicked,
          dateParser = _props.dateParser;

      if (!item.disabled) {
        onPicked(dateParser(item.value));
      }
    }
  }, {
    key: 'items',
    value: function items() {
      return TimeSelectPanel.items(this.props);
    }
  }, {
    key: 'scrollToOption',
    value: function scrollToOption() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'selected';

      var menu = this.refs.root.querySelector('.ishow-picker-panel__content');
      (0, _dom.scrollIntoView)(menu, menu.getElementsByClassName(className)[0]);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToOption();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      clearTimeout(this._timer);
      if (nextProps.value !== this.props.value) {
        this._timer = setTimeout(function () {
          return _this2.scrollToOption();
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var value = this.props.value;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'ishow-picker-panel time-select' },
        _react2.default.createElement(
          _Scrollbar.Scrollbar,
          { wrapClass: 'ishow-picker-panel__content', noresize: true },
          this.items().map(function (item, idx) {
            return _react2.default.createElement(
              'div',
              { key: idx,
                className: _this3.classNames('time-select-item', { selected: value === item.value, disabled: item.disabled }),
                disabled: item.disabled,
                onClick: function onClick() {
                  return _this3.handleClick(item);
                } },
              item.value
            );
          })
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        start: _propTypes2.default.string,
        end: _propTypes2.default.string,
        step: _propTypes2.default.string,
        minTime: _propTypes2.default.string,
        maxTime: _propTypes2.default.string,
        value: _propTypes2.default.string,
        onPicked: _propTypes2.default.func,
        //(string)=>date
        dateParser: _propTypes2.default.func.isRequired,
        //()=>HtmlElement
        getPopperRefElement: _propTypes2.default.func,
        popperMixinOption: _propTypes2.default.object
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  return TimeSelectPanel;
}(_PopperBase2.PopperBase);

exports.default = TimeSelectPanel;


TimeSelectPanel.isValid = function (value, _ref) {
  var start = _ref.start,
      end = _ref.end,
      step = _ref.step,
      minTime = _ref.minTime,
      maxTime = _ref.maxTime;

  var items = TimeSelectPanel.items({ start: start, end: end, step: step, minTime: minTime, maxTime: maxTime });
  return !!items.filter(function (e) {
    return !e.disabled;
  }).find(function (e) {
    return e.value === value;
  });
};

TimeSelectPanel.items = function (_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      step = _ref2.step,
      minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;

  var result = [];

  if (start && end && step) {
    var current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }
  return result;
};

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked: function onPicked() {},

  popperMixinOption: {}
};

var parseTime = function parseTime(time) {
  var values = (time || '').split(':');
  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);

    return {
      hours: hours,
      minutes: minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);

  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);

  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};