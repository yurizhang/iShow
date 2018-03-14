var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Dropdown.css';

var DropdownItem = function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).apply(this, arguments));
  }

  _createClass(DropdownItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.context.component.handleMenuItemClick(this.props.command, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          divided = _props.divided;


      return React.createElement(
        'li',
        {
          style: this.style(),
          className: this.className('ishow-dropdown-menu__item', {
            'is-disabled': disabled,
            'ishow-dropdown-menu__item--divided': divided
          }), onClick: this.handleClick.bind(this)
        },
        this.props.children
      );
    }
  }]);

  return DropdownItem;
}(Component);

export default DropdownItem;


DropdownItem.contextTypes = {
  component: PropTypes.any
};

DropdownItem.propTypes = {
  command: PropTypes.string,
  disabled: PropTypes.bool,
  divided: PropTypes.bool
};