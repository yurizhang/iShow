var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../Common/popper';
import Transition from '../Message/transition';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Dropdown.css';

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(DropdownMenu, [{
    key: 'onVisibleChange',
    value: function onVisibleChange(visible) {
      this.setState({
        showPopper: visible
      });
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      var parent = ReactDOM.findDOMNode(this.parent());

      this.popperJS = new Popper(parent, this.refs.popper, {
        placement: this.placement(),
        gpuAcceleration: false
      });
    }
  }, {
    key: 'onAfterLeave',
    value: function onAfterLeave() {
      this.popperJS.destroy();
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'placement',
    value: function placement() {
      return 'bottom-' + this.parent().props.menuAlign;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        Transition,
        { name: 'ishow-zoom-in-top', onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
        React.createElement(
          View,
          { show: this.state.showPopper },
          React.createElement(
            'ul',
            { ref: 'popper', style: this.style(), className: this.className('ishow-dropdown-menu') },
            this.props.children
          )
        )
      );
    }
  }]);

  return DropdownMenu;
}(Component);

export default DropdownMenu;


DropdownMenu.contextTypes = {
  component: PropTypes.any
};