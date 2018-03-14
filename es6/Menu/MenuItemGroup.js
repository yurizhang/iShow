var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import MixinComponent from './MixinComponent';

var MenuItemGroup = function (_MixinComponent) {
  _inherits(MenuItemGroup, _MixinComponent);

  function MenuItemGroup(props) {
    _classCallCheck(this, MenuItemGroup);

    var _this = _possibleConstructorReturn(this, (MenuItemGroup.__proto__ || Object.getPrototypeOf(MenuItemGroup)).call(this, props));

    _this.instanceType = 'MenuItemGroup';

    _this.state = {
      paddingLeft: 20
    };
    return _this;
  }

  _createClass(MenuItemGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initPadding();
    }
  }, {
    key: 'initPadding',
    value: function initPadding() {
      var level = 0,
          parent = this.parent(),
          component = parent.instanceType;

      while (component !== 'Menu') {
        if (component === 'SubMenu') {
          level++;
        }

        parent = parent.parent();
        component = parent.instanceType;
      }

      this.setState({
        paddingLeft: this.state.paddingLeft + level * 10
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { style: this.style(), className: this.className('ishow-menu-item-group') },
        React.createElement(
          'div',
          { className: 'ishow-menu-item-group__title', style: {
              paddingLeft: this.state.paddingLeft
            } },
          this.props.title
        ),
        React.createElement(
          'ul',
          null,
          this.props.children
        )
      );
    }
  }]);

  return MenuItemGroup;
}(MixinComponent);

export default MenuItemGroup;


MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
};