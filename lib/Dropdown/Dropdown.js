'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('../Button/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

require('../Common/css/Dropdown.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法

_Button2.default.Group = _ButtonGroup2.default;

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initEvent();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.visible !== this.state.visible) {
        this.refs.dropdown.onVisibleChange(state.visible);

        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(state.visible);
        }
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.setState({ visible: true });
      }, 250);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this3.setState({ visible: false });
      }, 150);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _props = this.props,
          trigger = _props.trigger,
          splitButton = _props.splitButton;

      var triggerElm = _reactDom2.default.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', this.show.bind(this));
        triggerElm.addEventListener('mouseleave', this.hide.bind(this));

        var dropdownElm = _reactDom2.default.findDOMNode(this.refs.dropdown);

        dropdownElm.addEventListener('mouseenter', this.show.bind(this));
        dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'handleMenuItemClick',
    value: function handleMenuItemClick(command, instance) {
      var _this4 = this;

      if (this.props.hideOnClick) {
        this.setState({
          visible: false
        });
      }

      if (this.props.onCommand) {
        setTimeout(function () {
          _this4.props.onCommand(command, instance);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          splitButton = _props2.splitButton,
          type = _props2.type,
          size = _props2.size,
          menu = _props2.menu;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-dropdown') },
        splitButton ? _react2.default.createElement(
          _Button2.default.Group,
          null,
          _react2.default.createElement(
            _Button2.default,
            { type: type, size: size, onClick: this.props.onClick.bind(this) },
            this.props.children
          ),
          _react2.default.createElement(
            _Button2.default,
            { ref: 'trigger', type: type, size: size, className: 'ishow-dropdown__caret-button' },
            _react2.default.createElement('i', { className: 'ishow-dropdown__icon ishow-icon-caret-bottom' })
          )
        ) : _react2.default.cloneElement(this.props.children, { ref: 'default' }),
        _react2.default.cloneElement(menu, {
          ref: 'dropdown'
        })
      );
    }
  }]);

  return Dropdown;
}(_index2.default);

Dropdown.childContextTypes = {
  component: _propTypes2.default.any
};

Dropdown.propTypes = {
  menu: _propTypes2.default.node.isRequired,
  type: _propTypes2.default.string,
  size: _propTypes2.default.string,
  trigger: _propTypes2.default.oneOf(['hover', 'click']),
  menuAlign: _propTypes2.default.oneOf(['start', 'end']),
  splitButton: _propTypes2.default.bool,
  hideOnClick: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onCommand: _propTypes2.default.func,
  onVisibleChange: _propTypes2.default.func
};

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
};

exports.default = (0, _reactClickOutside2.default)(Dropdown);