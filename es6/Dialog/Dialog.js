var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Dialog.css';

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

    _this.state = {
      bodyOverflow: ''
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      if (this.willOpen(this.props, nextProps)) {
        if (this.props.lockScroll && document.body && document.body.style) {
          if (!this.state.bodyOverflow) {
            this.setState({
              bodyOverflow: document.body.style.overflow
            });
          }
          document.body.style.overflow = 'hidden';
        }
      }

      if (this.willClose(this.props, nextProps) && this.props.lockScroll) {
        if (this.props.modal && this.state.bodyOverflow !== 'hidden' && document.body && document.body.style) {
          document.body.style.overflow = this.state.bodyOverflow;
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.willOpen(prevProps, this.props)) {
        this.refs.wrap.focus();
        //console.log("open"); //这里加上窗口初始化
        if (this.props.onOpen) {
          this.props.onOpen(); //打开窗口后自动调用
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (document.body && document.body.style) document.body.style.removeProperty('overflow');
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      if (this.props.closeOnPressEscape && e.keyCode === 27) {
        this.close(e);
      }
    }
  }, {
    key: 'handleWrapperClick',
    value: function handleWrapperClick(e) {
      if (e.target instanceof HTMLDivElement) {
        if (this.props.closeOnClickModal && e.target === e.currentTarget) {
          this.close(e);
        }
      }
    }
  }, {
    key: 'close',
    value: function close(e) {
      this.props.onCancel(e);
    }
  }, {
    key: 'willOpen',
    value: function willOpen(prevProps, nextProps) {
      return !prevProps.visible && nextProps.visible;
    }
  }, {
    key: 'willClose',
    value: function willClose(prevProps, nextProps) {
      return prevProps.visible && !nextProps.visible;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          visible = _props.visible,
          title = _props.title,
          size = _props.size,
          top = _props.top,
          modal = _props.modal,
          customClass = _props.customClass;


      return React.createElement(
        Transition,
        {
          name: 'ishow-zoom-in-center'
        },
        React.createElement(
          View,
          { show: visible },
          React.createElement(
            'div',
            {
              style: this.style({ zIndex: 1013 }),
              className: this.className('ishow_dialog__wrapper'),
              onClick: function onClick(e) {
                return _this2.handleWrapperClick(e);
              },
              ref: 'wrap',
              tabIndex: -1,
              onKeyDown: function onKeyDown(e) {
                return _this2.onKeyDown(e);
              }
            },
            React.createElement(
              'div',
              {
                ref: 'dialog',
                className: this.classNames("ishow_dialog", 'ishow_dialog--' + size, customClass),
                style: size === 'full' ? {} : { 'marginBottom': '50px', 'top': top }
              },
              React.createElement(
                'div',
                { className: 'ishow_dialog__header' },
                React.createElement(
                  'span',
                  { className: 'ishow_dialog__title' },
                  title
                ),
                React.createElement(
                  'div',
                  { className: 'ishow_dialog__headerbtn' },
                  React.createElement('i', { className: 'ishow_dialog__close ishow-icon ishow-icon-close', onClick: function onClick(e) {
                      return _this2.close(e);
                    } })
                )
              ),
              this.props.children
            )
          ),
          React.createElement(
            View,
            { show: modal, transition: 'v-modal', transitionKey: 'dialog-v-modal' },
            React.createElement('div', { className: 'v-modal', style: { zIndex: 1012 } })
          )
        )
      );
    }
  }]);

  return Dialog;
}(Component);

Dialog.propTypes = {
  // 控制对话框是否可见
  visible: PropTypes.bool.isRequired,
  // 标题
  title: PropTypes.string,
  // 大小 (tiny/small/large/full)
  size: PropTypes.string,
  // top 值（仅在 size 不为 full 时有效）
  top: PropTypes.string,
  // 控制遮罩层展示
  modal: PropTypes.bool,
  // Dialog 的自定义类名
  customClass: PropTypes.string,
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: PropTypes.bool,
  // 点击遮罩层或右上角叉或取消按钮的回调
  onCancel: PropTypes.func.isRequired
};

Dialog.defaultProps = {
  visible: false,
  title: '',
  size: 'small',
  top: '15%',
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true
};

var DialogBody = function (_Component2) {
  _inherits(DialogBody, _Component2);

  function DialogBody() {
    _classCallCheck(this, DialogBody);

    return _possibleConstructorReturn(this, (DialogBody.__proto__ || Object.getPrototypeOf(DialogBody)).apply(this, arguments));
  }

  _createClass(DialogBody, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow_dialog__body') },
        this.props.children
      );
    }
  }]);

  return DialogBody;
}(Component);

var DialogFooter = function (_Component3) {
  _inherits(DialogFooter, _Component3);

  function DialogFooter() {
    _classCallCheck(this, DialogFooter);

    return _possibleConstructorReturn(this, (DialogFooter.__proto__ || Object.getPrototypeOf(DialogFooter)).apply(this, arguments));
  }

  _createClass(DialogFooter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow_dialog__footer') },
        this.props.children
      );
    }
  }]);

  return DialogFooter;
}(Component);

Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

export default Dialog;