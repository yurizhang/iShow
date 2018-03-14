var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
//import {default as Component} from '../../plugs/index.js'; //提供style, classname方法
import '../Common/css/radio-button.css';
import Radio from './Radio';

var RadioButton = function (_Radio) {
  _inherits(RadioButton, _Radio);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, (RadioButton.__proto__ || Object.getPrototypeOf(RadioButton)).apply(this, arguments));
  }

  _createClass(RadioButton, [{
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'size',
    value: function size() {
      return this.parent().props.size;
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.props.disabled || this.parent().props.disabled;
    }
  }, {
    key: 'activeStyle',
    value: function activeStyle() {
      return {
        backgroundColor: this.parent().props.fill || '',
        borderColor: this.parent().props.fill || '',
        color: this.parent().props.textColor || ''
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'label',
        { style: this.style(), className: this.className('ishow-radio-button', this.props.size && 'ishow-radio-button--' + this.size(), {
            'is-active': this.state.checked
          }) },
        React.createElement('input', {
          type: 'radio',
          className: 'ishow-radio-button__orig-radio',
          checked: this.state.checked,
          disabled: this.isDisabled(),
          onChange: this.onChange.bind(this)
        }),
        React.createElement(
          'span',
          { className: 'ishow-radio-button__inner', style: this.state.checked ? this.activeStyle() : {} },
          this.props.children || this.props.value
        )
      );
    }
  }]);

  return RadioButton;
}(Radio);

RadioButton.elementType = 'RadioButton';
export default RadioButton;


RadioButton.contextTypes = {
  component: PropTypes.any
};

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  name: PropTypes.string
};