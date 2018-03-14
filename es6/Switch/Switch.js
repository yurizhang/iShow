var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Switch.css';

// type State = {
//   value: boolean | number | string,
//   coreWidth: number,
//   buttonStyle: Object
// };

var Switch = function (_Component) {
  _inherits(Switch, _Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.width === 0) {
        this.setState({
          coreWidth: this.hasText() ? 58 : 46
        });
        //this.state.coreWidth = this.hasText() ? 58 : 46;
      }

      this.updateSwitch();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState({ value: props.value }, function () {
        _this2.updateSwitch();
      });

      if (props.width) {
        this.setState({ coreWidth: props.width });
      }
    }
  }, {
    key: 'updateSwitch',
    value: function updateSwitch() {
      this.handleButtonTransform();

      if (this.props.onColor || this.props.offColor) {
        this.setBackgroundColor();
      }
    }
  }, {
    key: 'hasText',
    value: function hasText() {
      return this.props.onText || this.props.offText;
    }
  }, {
    key: 'setBackgroundColor',
    value: function setBackgroundColor() {
      var newColor = this.state.value === this.props.onValue ? this.props.onColor : this.props.offColor;

      this.refs.core.style.borderColor = newColor;
      this.refs.core.style.backgroundColor = newColor;
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      if (this.props.allowFocus) {
        this.refs.input.focus();
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      if (this.props.allowFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      if (this.props.allowFocus) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this3 = this;

      this.setState({
        value: e.target.checked ? this.props.onValue : this.props.offValue
      }, function () {
        _this3.updateSwitch();

        if (_this3.props.onChange) {
          _this3.props.onChange(_this3.state.value);
        }
      });
    }
  }, {
    key: 'handleButtonTransform',
    value: function handleButtonTransform() {
      var _state = this.state,
          value = _state.value,
          coreWidth = _state.coreWidth,
          buttonStyle = _state.buttonStyle;

      buttonStyle.transform = value === this.props.onValue ? 'translate(' + (coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';

      this.setState({ buttonStyle: buttonStyle });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          disabled = _props.disabled,
          onText = _props.onText,
          offText = _props.offText,
          onValue = _props.onValue,
          onIconClass = _props.onIconClass,
          offIconClass = _props.offIconClass,
          allowFocus = _props.allowFocus;
      var _state2 = this.state,
          value = _state2.value,
          coreWidth = _state2.coreWidth,
          buttonStyle = _state2.buttonStyle;


      return React.createElement(
        'label',
        {
          style: this.style(),
          className: this.className('ishow-switch', {
            'is-disabled': disabled,
            'ishow-switch--wide': this.hasText(),
            'is-checked': value === onValue
          }) },
        React.createElement(
          View,
          { show: disabled },
          React.createElement('div', { className: 'ishow-switch__mask' })
        ),
        React.createElement('input', {
          className: this.className('ishow-switch__input', {
            'allow-focus': allowFocus
          }),
          type: 'checkbox',
          checked: value === onValue,
          name: name,
          ref: 'input',
          disabled: disabled,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this)
        }),
        React.createElement(
          'span',
          { className: 'ishow-switch__core', ref: 'core', style: { 'width': coreWidth + 'px' } },
          React.createElement('span', { className: 'ishow-switch__button', style: Object.assign({}, buttonStyle), onClick: this.setFocus.bind(this) })
        ),
        React.createElement(
          Transition,
          { name: 'label-fade' },
          React.createElement(
            View,
            { show: value === onValue },
            React.createElement(
              'div',
              {
                className: 'ishow-switch__label ishow-switch__label--left',
                style: { 'width': coreWidth + 'px' }
              },
              onIconClass && React.createElement('i', { className: onIconClass }),
              !onIconClass && onText && React.createElement(
                'span',
                null,
                onText
              )
            )
          )
        ),
        React.createElement(
          Transition,
          { name: 'label-fade' },
          React.createElement(
            View,
            { show: value !== onValue },
            React.createElement(
              'div',
              {
                className: 'ishow-switch__label ishow-switch__label--right',
                style: { 'width': coreWidth + 'px' }
              },
              offIconClass && React.createElement('i', { className: offIconClass }),
              !offIconClass && offText && React.createElement(
                'span',
                null,
                offText
              )
            )
          )
        )
      );
    }
  }]);

  return Switch;
}(Component);

export default Switch;


Switch.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  onIconClass: PropTypes.string,
  offIconClass: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  onValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  allowFocus: PropTypes.bool
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
};