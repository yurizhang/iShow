'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

require('../Common/css/Form.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


// type State = {
//   error: string,
//   valid: boolean,
//   validating: boolean
// };

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

  //state: State;

  function FormItem(props) {
    _classCallCheck(this, FormItem);

    var _this = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));

    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  _createClass(FormItem, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        form: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var prop = this.props.prop;


      if (prop) {
        this.parent().addField(this);

        this.initialValue = this.getInitialValue();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeField(this);
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'isRequired',
    value: function isRequired() {
      var rules = this.getRules();
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;

            return false;
          }
          return true;
        });
      }

      return isRequired;
    }
  }, {
    key: 'onFieldBlur',
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: 'onFieldChange',
    value: function onFieldChange() {
      var _this2 = this;

      if (this.validateDisabled) {
        this.validateDisabled = false;

        return;
      }

      setTimeout(function () {
        _this2.validate('change');
      });
    }
  }, {
    key: 'validate',
    value: function validate(trigger, cb) {
      var _this3 = this;

      var rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb();
        }

        return true;
      }

      this.setState({ validating: true });

      var descriptor = _defineProperty({}, this.props.prop, rules);
      var validator = new _asyncValidator2.default(descriptor);
      var model = _defineProperty({}, this.props.prop, this.fieldValue());

      validator.validate(model, { firstFields: true }, function (errors) {
        _this3.setState({
          error: errors ? errors[0].message : '',
          validating: false,
          valid: !errors
        }, function () {
          if (cb instanceof Function) {
            cb(errors);
          }
        });
      });
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue() {
      var value = this.parent().props.model[this.props.prop];

      if (value === undefined) {
        return value;
      } else {
        return JSON.parse(JSON.stringify(value));
      }
    }
  }, {
    key: 'resetField',
    value: function resetField() {
      var _state = this.state,
          valid = _state.valid,
          error = _state.error;


      valid = true;
      error = '';

      this.setState({ valid: valid, error: error });

      var value = this.fieldValue();

      if (Array.isArray(value) && value.length > 0) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = [];
      } else if (value) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = this.initialValue;
      }
    }
  }, {
    key: 'getRules',
    value: function getRules() {
      var formRules = this.parent().props.rules;
      var selfRuels = this.props.rules;

      formRules = formRules ? formRules[this.props.prop] : [];
      return [].concat(selfRuels || formRules || []);
    }
  }, {
    key: 'getFilteredRule',
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    }
  }, {
    key: 'labelStyle',
    value: function labelStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top') return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = parseInt(labelWidth, 10);
      }

      return ret;
    }
  }, {
    key: 'contentStyle',
    value: function contentStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = parseInt(labelWidth, 10);
      }

      return ret;
    }
  }, {
    key: 'fieldValue',
    value: function fieldValue() {
      var model = this.parent().props.model;
      if (!model || !this.props.prop) {
        return;
      }
      var temp = this.props.prop.split(':');
      return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          error = _state2.error,
          validating = _state2.validating;
      var _props = this.props,
          label = _props.label,
          required = _props.required;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-form-item', {
            'is-error': error !== '',
            'is-validating': validating,
            'is-required': this.isRequired() || required
          }), onBlur: this.onFieldBlur.bind(this), onChange: this.onFieldChange.bind(this) },
        label && _react2.default.createElement(
          'label',
          { className: 'ishow-form-item__label', style: this.labelStyle() },
          label + this.parent().props.labelSuffix
        ),
        _react2.default.createElement(
          'div',
          { className: 'ishow-form-item__content', style: this.contentStyle() },
          this.props.children,
          _react2.default.createElement(
            _transition2.default,
            { name: 'ishow-zoom-in-top' },
            error && _react2.default.createElement(
              'div',
              { className: 'ishow-form-item__error' },
              error
            )
          )
        )
      );
    }
  }]);

  return FormItem;
}(_index2.default);

exports.default = FormItem;


FormItem.contextTypes = {
  component: _propTypes2.default.any
};

FormItem.childContextTypes = {
  form: _propTypes2.default.any
};

FormItem.propTypes = {
  label: _propTypes2.default.string,
  labelWidth: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  prop: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  rules: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])
};