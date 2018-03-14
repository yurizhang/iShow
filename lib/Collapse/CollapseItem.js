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

require('../Common/css/Collapse-item.css');

var _CollapseTransition = require('./CollapseTransition');

var _CollapseTransition2 = _interopRequireDefault(_CollapseTransition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


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


      return _react2.default.createElement(
        'div',
        {
          className: this.classNames({
            'ishow-collapse-item': true,
            'is-active': isActive
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'ishow-collapse-item__header', onClick: function onClick() {
              return _onClick(name);
            } },
          _react2.default.createElement('i', { className: 'ishow-collapse-item__header__arrow ishow-icon-arrow-right' }),
          title
        ),
        _react2.default.createElement(
          _CollapseTransition2.default,
          { isShow: isActive },
          _react2.default.createElement(
            'div',
            { className: 'ishow-collapse-item__wrap' },
            _react2.default.createElement(
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
}(_index2.default);

exports.default = CollapseItem;


CollapseItem.propTypes = {
  onClick: _propTypes2.default.func,
  isActive: _propTypes2.default.bool,
  title: _propTypes2.default.node,
  name: _propTypes2.default.string
};