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

require('../Common/css/checkbox.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props));

    _this.state = {
      checked: props.checked,
      focus: props.focus,
      label: _this.getLabel(props)
    };
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked, focus: nextProps.focus, label: this.getLabel(nextProps)
      });
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({
        focus: true
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var _this2 = this;

      if (e.target instanceof HTMLInputElement) {
        var label = this.state.label;
        var _props = this.props,
            trueLabel = _props.trueLabel,
            falseLabel = _props.falseLabel;


        var checked = e.target.checked;
        var group = this.context.ElCheckboxGroup;

        if (group) {
          var length = group.state.options.length + (checked ? 1 : -1);

          if (group.props.min !== undefined && length < group.props.min) {
            return;
          }

          if (group.props.max !== undefined && length > group.props.max) {
            return;
          }
        }

        var newLabel = label;

        if (this.props.trueLabel || this.props.falseLabel) {
          newLabel = checked ? trueLabel : falseLabel;
        }

        this.setState({
          checked: checked,
          label: newLabel
        }, function () {
          if (_this2.props.onChange) {
            _this2.props.onChange(checked);
          }
        });
      }
    }
  }, {
    key: 'getLabel',
    value: function getLabel(props) {
      if (props.trueLabel || props.falseLabel) {
        return props.checked ? props.trueLabel : props.falseLabel;
      } else {
        return props.label;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'label',
        { style: this.style(), className: this.className('ishow-checkbox') },
        _react2.default.createElement(
          'span',
          { className: this.classNames('ishow-checkbox__input', {
              'is-disabled': this.props.disabled,
              'is-checked': this.state.checked,
              'is-indeterminate': this.props.indeterminate,
              'is-focus': this.state.focus
            }) },
          _react2.default.createElement('span', { className: 'ishow-checkbox__inner' }),
          _react2.default.createElement('input', {
            className: 'ishow-checkbox__original',
            type: 'checkbox',
            checked: this.state.checked,
            disabled: this.props.disabled,
            onFocus: this.onFocus.bind(this),
            onBlur: this.onBlur.bind(this),
            onChange: this.onChange.bind(this)
          })
        ),
        _react2.default.createElement(
          'span',
          { className: 'ishow-checkbox__label' },
          this.props.children || this.state.label
        )
      );
    }
  }]);

  return Checkbox;
}(_index2.default);

exports.default = Checkbox;


Checkbox.contextTypes = {
  ElCheckboxGroup: _propTypes2.default.any
};

Checkbox.propTypes = {
  label: _propTypes2.default.string,
  trueLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  falseLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  checked: _propTypes2.default.bool,
  indeterminate: _propTypes2.default.bool,
  focus: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};

Checkbox.defaultProps = {
  checked: false,
  focus: false
};