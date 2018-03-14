var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Collapse-item.css';
import CollapseTransition from './CollapseTransition';

var CollapseItem = function (_Component) {
  _inherits(CollapseItem, _Component);

  function CollapseItem() {
    _classCallCheck(this, CollapseItem);

    return _possibleConstructorReturn(this, (CollapseItem.__proto__ || Object.getPrototypeOf(CollapseItem)).apply(this, arguments));
  }

  _createClass(CollapseItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          isActive = _props.isActive,
          _onClick = _props.onClick,
          name = _props.name;


      return React.createElement(
        'div',
        {
          className: this.classNames({
            'ishow-collapse-item': true,
            'is-active': isActive
          })
        },
        React.createElement(
          'div',
          { className: 'ishow-collapse-item__header', onClick: function onClick() {
              return _onClick(name);
            } },
          React.createElement('i', { className: 'ishow-collapse-item__header__arrow ishow-icon-arrow-right' }),
          title
        ),
        React.createElement(
          CollapseTransition,
          { isShow: isActive },
          React.createElement(
            'div',
            { className: 'ishow-collapse-item__wrap' },
            React.createElement(
              'div',
              { className: 'ishow-collapse-item__content' },
              this.props.children
            )
          )
        )
      );
    }
  }]);

  return CollapseItem;
}(Component);

export default CollapseItem;


CollapseItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.node,
  name: PropTypes.string
};