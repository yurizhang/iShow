var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.state = {
      options: _this.props.value || []
    };
    return _this;
  }

  _createClass(CheckboxGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          options: nextProps.value
        });
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ElCheckboxGroup: this
      };
    }
  }, {
    key: 'onChange',
    value: function onChange(value, checked) {
      var index = this.state.options.indexOf(value);

      if (checked) {
        if (index === -1) {
          this.state.options.push(value);
        }
      } else {
        this.state.options.splice(index, 1);
      }

      this.forceUpdate();

      if (this.props.onChange) {
        this.props.onChange(this.state.options);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.state.options;


      var children = React.Children.map(this.props.children, function (child, index) {
        if (!child) {
          return null;
        }

        var elementType = child.type.elementType;
        // 过滤非Checkbox和CheckboxButton的子组件

        if (elementType !== 'Checkbox' && elementType !== 'CheckboxButton') {
          return null;
        }

        return React.cloneElement(child, Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0,
          onChange: _this2.onChange.bind(_this2, child.props.value || child.props.label)
        }));
      });

      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-checkbox-group') },
        children
      );
    }
  }]);

  return CheckboxGroup;
}(Component);

export default CheckboxGroup;


CheckboxGroup.childContextTypes = {
  ElCheckboxGroup: PropTypes.any
};

CheckboxGroup.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
};