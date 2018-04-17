var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import AsyncValidator from 'async-validator';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Form.css';

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

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
      var validator = new AsyncValidator(descriptor);
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


      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-form-item', {
            'is-error': error !== '',
            'is-validating': validating,
            'is-required': this.isRequired() || required
          }), onBlur: this.onFieldBlur.bind(this), onChange: this.onFieldChange.bind(this) },
        label && React.createElement(
          'label',
          { className: 'ishow-form-item__label', style: this.labelStyle() },
          label + this.parent().props.labelSuffix
        ),
        React.createElement(
          'div',
          { className: 'ishow-form-item__content', style: this.contentStyle() },
          this.props.children,
          React.createElement(
            Transition,
            { name: 'ishow-zoom-in-top' },
            error && React.createElement(
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
}(Component);

export default FormItem;


FormItem.contextTypes = {
  component: PropTypes.any
};

FormItem.childContextTypes = {
  form: PropTypes.any
};

FormItem.propTypes = {
  label: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};