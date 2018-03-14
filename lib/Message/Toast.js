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

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


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


      return _react2.default.createElement(
        _transition2.default,
        { name: 'ishow-message-fade', onAfterLeave: function onAfterLeave() {
            _this3.props.willUnmount();
          } },
        _react2.default.createElement(
          _index.View,
          { show: this.state.visible },
          _react2.default.createElement(
            'div',
            { className: this.classNames('ishow-message', customClass), onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
            !iconClass && _react2.default.createElement('img', { className: 'ishow-message__img', src: _assets2.default[this.props.type], alt: _assets2.default[this.props.type] }),
            _react2.default.createElement(
              'div',
              { className: this.classNames('ishow-message__group', { 'is-with-icon': iconClass }) },
              iconClass && _react2.default.createElement('i', { className: this.classNames('ishow-message__icon', iconClass) }),
              _react2.default.createElement(
                'p',
                null,
                this.props.message
              ),
              this.props.showClose && _react2.default.createElement('div', { className: 'ishow-message__closeBtn ishow-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);

  return Toast;
}(_index2.default);

exports.default = Toast;


Toast.propTypes = {
  type: _propTypes2.default.oneOf(['success', 'warning', 'info', 'error']),
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  duration: _propTypes2.default.number,
  showClose: _propTypes2.default.bool,
  customClass: _propTypes2.default.string,
  iconClass: _propTypes2.default.string
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};