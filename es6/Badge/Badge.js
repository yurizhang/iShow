var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { default as Component } from '../Common/plugs/index.js';
import PropTypes from 'prop-types';
import '../Common/css/Badge.css';

var Badge = function (_Component) {
  _inherits(Badge, _Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          value = _props.value,
          max = _props.max,
          isDot = _props.isDot;

      var className = this.classNames({
        'ishow-badge__content': true,
        'is-fixed': !!children,
        'is-dot': !!isDot
      });
      var content = void 0;

      if (isDot) {
        content = null;
      } else {
        if (typeof value === 'number' && typeof max === 'number') {
          content = max < value ? max + '+' : value;
        } else {
          content = value;
        }
      }

      return React.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-badge') },
        children,
        React.createElement(
          'sup',
          { className: className },
          content
        )
      );
    }
  }]);

  return Badge;
}(Component);

export default Badge;


Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.number,
  isDot: PropTypes.bool
};

Badge.defaultProps = {
  isDot: false
};