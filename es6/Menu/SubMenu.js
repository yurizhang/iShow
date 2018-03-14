var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import CollapseTransition from '../Collapse/CollapseTransition';
import MixinComponent from './MixinComponent';

var SubMenu = function (_MixinComponent) {
  _inherits(SubMenu, _MixinComponent);

  function SubMenu(props) {
    _classCallCheck(this, SubMenu);

    var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

    _this.instanceType = 'SubMenu';

    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(SubMenu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootMenu().state.submenus[this.props.index] = this;
      this.initEvents();
    }
  }, {
    key: 'onItemSelect',
    value: function onItemSelect(index, indexPath) {
      this.setState({
        active: indexPath.indexOf(this.props.index) !== -1
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
    }
  }, {
    key: 'handleMouseenter',
    value: function handleMouseenter() {
      var _this2 = this;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        _this2.rootMenu().openMenu(_this2.props.index, _this2.indexPath());
      }, 300);
    }
  }, {
    key: 'handleMouseleave',
    value: function handleMouseleave() {
      var _this3 = this;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        _this3.rootMenu().closeMenu(_this3.props.index, _this3.indexPath());
      }, 300);
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
        var triggerElm = ReactDOM.findDOMNode(this);

        triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
        triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
      } else {
        var _triggerElm = this.refs['submenu-title'];

        _triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'opened',
    value: function opened() {
      return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'li',
        { style: this.style(), className: this.className('ishow-submenu', {
            'is-active': this.state.active,
            'is-opened': this.opened()
          }) },
        React.createElement(
          'div',
          { ref: 'submenu-title', className: 'ishow-submenu__title' },
          this.props.title,
          React.createElement('i', { className: this.classNames('ishow-submenu__icon-arrow', {
              'ishow-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
              'ishow-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
            }) })
        ),
        this.rootMenu().props.mode === 'horizontal' ? React.createElement(
          Transition,
          { name: 'ishow-zoom-in-top' },
          React.createElement(
            View,
            { show: this.opened() },
            React.createElement(
              'ul',
              { className: 'ishow-menu' },
              this.props.children
            )
          )
        ) : React.createElement(
          CollapseTransition,
          { isShow: this.opened() },
          React.createElement(
            'ul',
            { className: 'ishow-menu' },
            this.props.children
          )
        )
      );
    }
  }]);

  return SubMenu;
}(MixinComponent);

export default SubMenu;


SubMenu.childContextTypes = {
  component: PropTypes.any
};

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
};