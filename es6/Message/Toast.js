var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from './transition';
import icons from './assets';

var Toast = function (_Component) {
  _inherits(Toast, _Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Toast, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });

      this.startTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimer();
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

      if (this.props.duration > 0) {
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          iconClass = _props.iconClass,
          customClass = _props.customClass;


      return React.createElement(
        Transition,
        { name: 'ishow-message-fade', onAfterLeave: function onAfterLeave() {
            _this3.props.willUnmount();
          } },
        React.createElement(
          View,
          { show: this.state.visible },
          React.createElement(
            'div',
            { className: this.classNames('ishow-message', customClass), onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
            !iconClass && React.createElement('img', { className: 'ishow-message__img', src: icons[this.props.type], alt: icons[this.props.type] }),
            React.createElement(
              'div',
              { className: this.classNames('ishow-message__group', { 'is-with-icon': iconClass }) },
              iconClass && React.createElement('i', { className: this.classNames('ishow-message__icon', iconClass) }),
              React.createElement(
                'p',
                null,
                this.props.message
              ),
              this.props.showClose && React.createElement('div', { className: 'ishow-message__closeBtn ishow-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Toast;
}(Component);

export default Toast;


Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  customClass: PropTypes.string,
  iconClass: PropTypes.string
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};