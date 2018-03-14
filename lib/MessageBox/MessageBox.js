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

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Input = require('../Input/Input');

var _Input2 = _interopRequireDefault(_Input);

require('../Common/css/MessageBox.css');

require('../Common/css/Base.css');

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

var MessageBox = function (_Component) {
  _inherits(MessageBox, _Component);

  function MessageBox(props) {
    _classCallCheck(this, MessageBox);

    var _this = _possibleConstructorReturn(this, (MessageBox.__proto__ || Object.getPrototypeOf(MessageBox)).call(this, props));

    _this.state = {
      visible: false,
      inputValue: props.inputValue
    };
    return _this;
  }

  _createClass(MessageBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: 'confirmButtonText',
    value: function confirmButtonText() {
      return this.props.confirmButtonText;
    }
  }, {
    key: 'cancelButtonText',
    value: function cancelButtonText() {
      return this.props.cancelButtonText;
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      this.setState({
        inputValue: value
      });
      this.validate(value);
    }
  }, {
    key: 'typeClass',
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] && 'ishow-icon-' + typeMap[this.props.type];
    }
  }, {
    key: 'validate',
    value: function validate(value) {
      var _props = this.props,
          inputPattern = _props.inputPattern,
          inputValidator = _props.inputValidator,
          inputErrorMessage = _props.inputErrorMessage;

      var editorErrorMessage = void 0;

      if (inputPattern && !inputPattern.test(value)) {
        editorErrorMessage = inputErrorMessage;
      }

      if (typeof inputValidator === 'function') {
        var validateResult = inputValidator(value);

        if (validateResult === false) {
          editorErrorMessage = inputErrorMessage;
        }

        if (typeof validateResult === 'string') {
          editorErrorMessage = validateResult;
        }
      }

      this.setState({ editorErrorMessage: editorErrorMessage });

      return !editorErrorMessage;
    }
  }, {
    key: 'handleAction',
    value: function handleAction(action) {
      var _props2 = this.props,
          modal = _props2.modal,
          promise = _props2.promise,
          showInput = _props2.showInput;


      if (modal) {
        switch (action) {
          case 'cancel':
            promise.reject();
            break;
          case 'confirm':
            if (modal === 'prompt') {
              if (this.validate(this.state.inputValue || '')) {
                if (showInput) {
                  promise.resolve({ value: this.state.inputValue, action: action });
                } else {
                  promise.resolve(action);
                }
              } else {
                return;
              }
            } else {
              promise.resolve();
            }
            break;
          default:
            break;
        }
      } else {
        promise.resolve(action);
      }

      this.close();
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          willUnmount = _props3.willUnmount,
          title = _props3.title,
          showClose = _props3.showClose,
          message = _props3.message,
          showInput = _props3.showInput,
          inputPlaceholder = _props3.inputPlaceholder,
          showCancelButton = _props3.showCancelButton,
          cancelButtonClass = _props3.cancelButtonClass,
          showConfirmButton = _props3.showConfirmButton,
          confirmButtonClass = _props3.confirmButtonClass,
          inputType = _props3.inputType;
      var _state = this.state,
          visible = _state.visible,
          editorErrorMessage = _state.editorErrorMessage;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { position: 'absolute', zIndex: 2001 } },
          _react2.default.createElement(
            _transition2.default,
            { name: 'msgbox-fade', onAfterLeave: function onAfterLeave() {
                willUnmount && willUnmount();
              } },
            _react2.default.createElement(
              _index.View,
              { show: visible },
              _react2.default.createElement(
                'div',
                { className: 'ishow-message-box__wrapper' },
                _react2.default.createElement(
                  'div',
                  { className: 'ishow-message-box' },
                  title && _react2.default.createElement(
                    'div',
                    { className: 'ishow-message-box__header' },
                    _react2.default.createElement(
                      'div',
                      { className: 'ishow-message-box__title' },
                      title
                    ),
                    showClose && _react2.default.createElement(
                      'button',
                      { type: 'button', className: 'ishow-message-box__headerbtn', 'aria-label': 'Close', onClick: this.handleAction.bind(this, 'cancel') },
                      _react2.default.createElement('i', { className: 'ishow-message-box__close ishow-icon-close' })
                    )
                  ),
                  message && _react2.default.createElement(
                    'div',
                    { className: 'ishow-message-box__content' },
                    _react2.default.createElement('div', { className: this.classNames('ishow-message-box__status', this.typeClass()) }),
                    _react2.default.createElement(
                      'div',
                      { className: 'ishow-message-box__message', style: { marginLeft: this.typeClass() ? '50px' : '0' } },
                      _react2.default.createElement(
                        'p',
                        null,
                        message
                      )
                    ),
                    _react2.default.createElement(
                      _index.View,
                      { show: showInput },
                      _react2.default.createElement(
                        'div',
                        { className: 'ishow-message-box__input' },
                        _react2.default.createElement(_Input2.default, {
                          className: this.classNames({
                            'invalid': editorErrorMessage
                          }),
                          type: inputType,
                          value: this.state.inputValue,
                          placeholder: inputPlaceholder,
                          onChange: this.onChange.bind(this)
                        }),
                        _react2.default.createElement(
                          'div',
                          { className: 'ishow-message-box__errormsg', style: {
                              visibility: editorErrorMessage ? 'visible' : 'hidden'
                            } },
                          editorErrorMessage
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'ishow-message-box__btns' },
                    _react2.default.createElement(
                      _index.View,
                      { show: showCancelButton },
                      _react2.default.createElement(
                        _Button2.default,
                        { className: cancelButtonClass, onClick: this.handleAction.bind(this, 'cancel') },
                        this.cancelButtonText()
                      )
                    ),
                    _react2.default.createElement(
                      _index.View,
                      { show: showConfirmButton },
                      _react2.default.createElement(
                        _Button2.default,
                        { className: this.classNames('ishow-button--primary', confirmButtonClass), onClick: this.handleAction.bind(this, 'confirm') },
                        this.confirmButtonText()
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _transition2.default,
          { name: 'v-modal' },
          _react2.default.createElement(
            _index.View,
            { show: visible },
            _react2.default.createElement('div', { className: 'v-modal', style: { zIndex: 1006 } })
          )
        )
      );
    }
  }]);

  return MessageBox;
}(_index2.default);

exports.default = MessageBox;


MessageBox.propTypes = {
  modal: _propTypes2.default.oneOf(['alert', 'confirm', 'prompt']),
  type: _propTypes2.default.oneOf(['success', 'warning', 'info', 'error']),
  title: _propTypes2.default.string,
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  showInput: _propTypes2.default.bool,
  showClose: _propTypes2.default.bool,
  showCancelButton: _propTypes2.default.bool,
  showConfirmButton: _propTypes2.default.bool,
  confirmButtonText: _propTypes2.default.string,
  cancelButtonText: _propTypes2.default.string,
  cancelButtonClass: _propTypes2.default.string,
  confirmButtonClass: _propTypes2.default.string,
  inputPlaceholder: _propTypes2.default.string,
  inputPattern: _propTypes2.default.regex,
  inputValidator: _propTypes2.default.func,
  inputErrorMessage: _propTypes2.default.string,
  inputValue: _propTypes2.default.any,
  inputType: _propTypes2.default.string,
  promise: _propTypes2.default.object,
  onClose: _propTypes2.default.func
};

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText: '确认',
  cancelButtonText: '取消'
};