'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MixinComponent2 = require('./MixinComponent');

var _MixinComponent3 = _interopRequireDefault(_MixinComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_MixinComponent) {
  _inherits(MenuItem, _MixinComponent);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.instanceType = 'MenuItem';
    return _this;
  }

  _createClass(MenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootMenu().state.menuItems[this.props.index] = this;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.rootMenu().handleSelect(this.props.index, this.indexPath(), this);
    }
  }, {
    key: 'active',
    value: function active() {
      return this.props.index === this.rootMenu().state.activeIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          style: this.style(),
          className: this.className("ishow-menu-item", {
            'is-active': this.active(),
            'is-disabled': this.props.disabled
          }),
          onClick: this.handleClick.bind(this)
        },
        this.props.children
      );
    }
  }]);

  return MenuItem;
}(_MixinComponent3.default);

exports.default = MenuItem;


MenuItem.propTypes = {
  index: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool
};