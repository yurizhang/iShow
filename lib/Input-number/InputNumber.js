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

require('../Common/css/Input-number.css');

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputNumber = function (_Component) {
  _inherits(InputNumber, _Component);

  function InputNumber(props) {
    _classCallCheck(this, InputNumber);

    var _this = _possibleConstructorReturn(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).call(this, props));

    _this.state = {
      value: props.defaultValue,
      inputActive: false
    };
    return _this;
  }

  _createClass(InputNumber, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.value !== this.props.value) {
        this.setState({ value: props.value });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      switch (e.keyCode) {
        case 38:
          // KeyUp
          e.preventDefault();
          this.increase();
          break;
        case 40:
          // KeyDown
          e.preventDefault();
          this.decrease();
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var value = this.state.value;

      if (this.isValid) {
        value = Number(value);

        if (value > this.props.max) {
          value = Number(this.props.max);
        } else if (value < this.props.min) {
          value = Number(this.props.min);
        }
      } else {
        value = undefined;
      }

      this.setState({ value: value }, this.onChange);
    }
  }, {
    key: 'onInput',
    value: function onInput(value) {
      var _this2 = this;

      this.setState({ value: value }, function () {
        clearTimeout(_this2.timeout);

        _this2.timeout = setTimeout(function () {
          _this2.onBlur();
        }, 750);
      });
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'increase',
    value: function increase() {
      var _props = this.props,
          step = _props.step,
          max = _props.max,
          disabled = _props.disabled,
          min = _props.min;
      var _state = this.state,
          value = _state.value,
          inputActive = _state.inputActive;


      if (this.maxDisabled) {
        inputActive = false;
      } else {
        if (value + Number(step) > max || disabled) return;
        if (value + Number(step) < min) value = min - Number(step);

        value = (0, _util.accAdd)(step, value);
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'decrease',
    value: function decrease() {
      var _props2 = this.props,
          step = _props2.step,
          min = _props2.min,
          disabled = _props2.disabled,
          max = _props2.max;
      var _state2 = this.state,
          value = _state2.value,
          inputActive = _state2.inputActive;


      if (this.minDisabled) {
        inputActive = false;
      } else {
        if (value - Number(step) < min || disabled) return;
        if (value - Number(step) > max) value = Number(max) + Number(step);
        value = (0, _util.accSub)(value, step);
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'activeInput',
    value: function activeInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: true
        });
      }
    }
  }, {
    key: 'inactiveInput',
    value: function inactiveInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          controls = _props3.controls,
          disabled = _props3.disabled,
          size = _props3.size;
      var _state3 = this.state,
          value = _state3.value,
          inputActive = _state3.inputActive;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-input-number', size && 'el-input-number--' + size, {
            'is-disabled': disabled,
            'is-without-controls': !controls
          }) },
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__decrease", {
              'is-disabled': this.minDisabled
            }),
            onClick: this.decrease.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-minus' })
        ),
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__increase", {
              'is-disabled': this.maxDisabled
            }),
            onClick: this.increase.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-plus' })
        ),
        _react2.default.createElement(_Input2.default, {
          ref: 'input',
          className: this.classNames({
            'is-active': inputActive
          }),
          value: value,
          disabled: disabled,
          size: size,
          onChange: this.onInput.bind(this),
          onKeyDown: this.onKeyDown.bind(this),
          onBlur: this.onBlur.bind(this) })
      );
    }
  }, {
    key: 'isValid',
    get: function get() {
      return this.state.value !== '' && !isNaN(Number(this.state.value));
    }
  }, {
    key: 'minDisabled',
    get: function get() {
      return !this.isValid || this.state.value - Number(this.props.step) < this.props.min;
    }
  }, {
    key: 'maxDisabled',
    get: function get() {
      return !this.isValid || this.state.value + Number(this.props.step) > this.props.max;
    }
  }]);

  return InputNumber;
}(_index2.default);

exports.default = InputNumber;


InputNumber.propTypes = {
  defaultValue: _propTypes2.default.number,
  value: _propTypes2.default.number,
  step: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  disabled: _propTypes2.default.bool,
  controls: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
};