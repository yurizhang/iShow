var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法

import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import '../Common/css/Dropdown.css';
Button.Group = ButtonGroup;

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initEvent();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.visible !== this.state.visible) {
        this.refs.dropdown.onVisibleChange(state.visible);

        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(state.visible);
        }
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.setState({ visible: true });
      }, 250);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this3.setState({ visible: false });
      }, 150);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _props = this.props,
          trigger = _props.trigger,
          splitButton = _props.splitButton;

      var triggerElm = ReactDOM.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', this.show.bind(this));
        triggerElm.addEventListener('mouseleave', this.hide.bind(this));

        var dropdownElm = ReactDOM.findDOMNode(this.refs.dropdown);

        dropdownElm.addEventListener('mouseenter', this.show.bind(this));
        dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'handleMenuItemClick',
    value: function handleMenuItemClick(command, instance) {
      var _this4 = this;

      if (this.props.hideOnClick) {
        this.setState({
          visible: false
        });
      }

      if (this.props.onCommand) {
        setTimeout(function () {
          _this4.props.onCommand(command, instance);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          splitButton = _props2.splitButton,
          type = _props2.type,
          size = _props2.size,
          menu = _props2.menu;


      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-dropdown') },
        splitButton ? React.createElement(
          Button.Group,
          null,
          React.createElement(
            Button,
            { type: type, size: size, onClick: this.props.onClick.bind(this) },
            this.props.children
          ),
          React.createElement(
            Button,
            { ref: 'trigger', type: type, size: size, className: 'ishow-dropdown__caret-button' },
            React.createElement('i', { className: 'ishow-dropdown__icon ishow-icon-caret-bottom' })
          )
        ) : React.cloneElement(this.props.children, { ref: 'default' }),
        React.cloneElement(menu, {
          ref: 'dropdown'
        })
      );
    }
  }]);

  return Dropdown;
}(Component);

Dropdown.childContextTypes = {
  component: PropTypes.any
};

Dropdown.propTypes = {
  menu: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  splitButton: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  onCommand: PropTypes.func,
  onVisibleChange: PropTypes.func
};

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
};

export default ClickOutside(Dropdown);