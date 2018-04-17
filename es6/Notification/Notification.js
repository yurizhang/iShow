var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Notification.css';
import '../Common/css/Icon.css';
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

      return React.createElement(
        Transition,
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
        React.createElement(
          View,
          { show: this.state.visible },
          React.createElement(
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
            this.props.iconClass ? React.createElement('i', { className: this.classNames('ishow-notification__icon', this.props.iconClass) }) : this.props.type ? React.createElement('i', { className: this.classNames('ishow-notification__icon', this.typeClass()) }) : '',
            React.createElement(
              'div',
              { className: this.classNames('ishow-notification__group', {
                  'is-with-icon': this.typeClass() || this.props.iconClass
                }) },
              React.createElement(
                'h2',
                { className: 'ishow-notification__title' },
                this.props.title
              ),
              React.createElement(
                'div',
                { className: 'ishow-notification__content' },
                this.props.message
              ),
              React.createElement('div', { className: 'ishow-notification__closeBtn ishow-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Notification;
}(Component);

export default Notification;


Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  top: PropTypes.number
};

Notification.defaultProps = {
  duration: 4500,
  top: 16
};