'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

require('../Common/css/Notification.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification(props) {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ visible: true });
      this.startTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      this.stopTimer();

      this.setState({
        visible: false
      });
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this2 = this;

      if (this.props.duration) {
        this.timeout = setTimeout(function () {
          _this2.onClose();
        }, this.props.duration);
      }
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'typeClass',
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] ? 'ishow-icon-' + typeMap[this.props.type] : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _transition2.default,
        {
          name: 'ishow-notification-fade',
          onAfterEnter: function onAfterEnter() {
            _this3.offsetHeight = _this3.rootDOM.offsetHeight;
          },
          onLeave: function onLeave() {
            _this3.props.onClose && _this3.props.onClose();
          },
          onAfterLeave: function onAfterLeave() {
            _this3.props.willUnmount(_this3.offsetHeight, parseInt(_this3.rootDOM.style.top, 10));
          }
        },
        _react2.default.createElement(
          _index.View,
          { show: this.state.visible },
          _react2.default.createElement(
            'div',
            {
              ref: function ref(ele) {
                _this3.rootDOM = ele;
              },
              className: 'ishow-notification',
              style: {
                top: this.props.top,
                zIndex: 9999
              },
              onMouseEnter: this.stopTimer.bind(this),
              onMouseLeave: this.startTimer.bind(this),
              onClick: this.onClick.bind(this)
            },
            this.props.type && _react2.default.createElement('i', { className: this.classNames('ishow-notification__icon', this.typeClass(), this.props.iconClass) }),
            _react2.default.createElement(
              'div',
              { className: this.classNames('ishow-notification__group', {
                  'is-with-icon': this.typeClass() || this.props.iconClass
                }) },
              _react2.default.createElement(
                'h2',
                { className: 'ishow-notification__title' },
                this.props.title
              ),
              _react2.default.createElement(
                'div',
                { className: 'ishow-notification__content' },
                this.props.message
              ),
              _react2.default.createElement('div', { className: 'ishow-notification__closeBtn ishow-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Notification;
}(_index2.default);

exports.default = Notification;


Notification.propTypes = {
  type: _propTypes2.default.oneOf(['success', 'warning', 'info', 'error']),
  title: _propTypes2.default.string,
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  duration: _propTypes2.default.number,
  iconClass: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  top: _propTypes2.default.number
};

Notification.defaultProps = {
  duration: 4500,
  top: 16
};