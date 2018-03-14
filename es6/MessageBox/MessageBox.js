var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Button from '../Button/Button';
import Input from '../Input/Input';
import '../Common/css/MessageBox.css';
import '../Common/css/Base.css';
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


      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: { position: 'absolute', zIndex: 2001 } },
          React.createElement(
            Transition,
            { name: 'msgbox-fade', onAfterLeave: function onAfterLeave() {
                willUnmount && willUnmount();
              } },
            React.createElement(
              View,
              { show: visible },
              React.createElement(
                'div',
                { className: 'ishow-message-box__wrapper' },
                React.createElement(
                  'div',
                  { className: 'ishow-message-box' },
                  title && React.createElement(
                    'div',
                    { className: 'ishow-message-box__header' },
                    React.createElement(
                      'div',
                      { className: 'ishow-message-box__title' },
                      title
                    ),
                    showClose && React.createElement(
                      'button',
                      { type: 'button', className: 'ishow-message-box__headerbtn', 'aria-label': 'Close', onClick: this.handleAction.bind(this, 'cancel') },
                      React.createElement('i', { className: 'ishow-message-box__close ishow-icon-close' })
                    )
                  ),
                  message && React.createElement(
                    'div',
                    { className: 'ishow-message-box__content' },
                    React.createElement('div', { className: this.classNames('ishow-message-box__status', this.typeClass()) }),
                    React.createElement(
                      'div',
                      { className: 'ishow-message-box__message', style: { marginLeft: this.typeClass() ? '50px' : '0' } },
                      React.createElement(
                        'p',
                        null,
                        message
                      )
                    ),
                    React.createElement(
                      View,
                      { show: showInput },
                      React.createElement(
                        'div',
                        { className: 'ishow-message-box__input' },
                        React.createElement(Input, {
                          className: this.classNames({
                            'invalid': editorErrorMessage
                          }),
                          type: inputType,
                          value: this.state.inputValue,
                          placeholder: inputPlaceholder,
                          onChange: this.onChange.bind(this)
                        }),
                        React.createElement(
                          'div',
                          { className: 'ishow-message-box__errormsg', style: {
                              visibility: editorErrorMessage ? 'visible' : 'hidden'
                            } },
                          editorErrorMessage
                        )
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'ishow-message-box__btns' },
                    React.createElement(
                      View,
                      { show: showCancelButton },
                      React.createElement(
                        Button,
                        { className: cancelButtonClass, onClick: this.handleAction.bind(this, 'cancel') },
                        this.cancelButtonText()
                      )
                    ),
                    React.createElement(
                      View,
                      { show: showConfirmButton },
                      React.createElement(
                        Button,
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
        React.createElement(
          Transition,
          { name: 'v-modal' },
          React.createElement(
            View,
            { show: visible },
            React.createElement('div', { className: 'v-modal', style: { zIndex: 1006 } })
          )
        )
      );
    }
  }]);

  return MessageBox;
}(Component);

export default MessageBox;


MessageBox.propTypes = {
  modal: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.regex,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  inputValue: PropTypes.any,
  inputType: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
};

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText: '确认',
  cancelButtonText: '取消'
};