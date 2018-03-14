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

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

var _popper = require('../Common/utils/popper');

var _popper2 = _interopRequireDefault(_popper);

require('../Common/css/Tooltip.css');

require('../Common/css/Popover.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.visible !== this.props.visible) {
        this.setState({
          showPopper: props.visible
        });
      }
    }
  }, {
    key: 'showPopper',
    value: function showPopper() {
      var _this2 = this;

      if (!this.props.manual) {
        this.timeout = setTimeout(function () {
          _this2.setState({ showPopper: true });
        }, this.props.openDelay);
      }
    }
  }, {
    key: 'hidePopper',
    value: function hidePopper() {
      if (!this.props.manual) {
        clearTimeout(this.timeout);
        this.setState({ showPopper: false });
      }
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      var _refs = this.refs,
          popper = _refs.popper,
          reference = _refs.reference,
          arrow = _refs.arrow;


      if (arrow) {
        arrow.setAttribute('x-arrow', '');
      }

      this.popperJS = new _popper2.default(reference, popper, {
        placement: this.props.placement,
        gpuAcceleration: false
      });
    }
  }, {
    key: 'onAfterLeave',
    value: function onAfterLeave() {
      this.popperJS.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          effect = _props.effect,
          content = _props.content,
          disabled = _props.disabled,
          transition = _props.transition,
          visibleArrow = _props.visibleArrow;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('ishow-tooltip'), onMouseEnter: this.showPopper.bind(this), onMouseLeave: this.hidePopper.bind(this) },
        _react2.default.createElement(
          'div',
          { ref: 'reference', className: 'ishow-tooltip__rel' },
          _react2.default.createElement(
            'div',
            null,
            this.props.children
          )
        ),
        !disabled && _react2.default.createElement(
          _transition2.default,
          { name: transition, onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
          _react2.default.createElement(
            _index.View,
            { show: this.state.showPopper },
            _react2.default.createElement(
              'div',
              { ref: 'popper', className: this.classNames("ishow-tooltip__popper", 'is-' + effect) },
              _react2.default.createElement(
                'div',
                null,
                content
              ),
              visibleArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
            )
          )
        )
      );
    }
  }]);

  return Tooltip;
}(_index2.default);

Tooltip.defaultProps = {
  effect: "dark",
  placement: "bottom",
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
};
exports.default = Tooltip;


Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: _propTypes2.default.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: _propTypes2.default.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  // 状态是否可用
  disabled: _propTypes2.default.bool,
  // 渐变动画定义
  transition: _propTypes2.default.string,
  // 是否显示 Tooltip 箭头
  visibleArrow: _propTypes2.default.bool,
  // 延迟出现(单位: 毫秒)
  openDelay: _propTypes2.default.number,
  // 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
  manual: _propTypes2.default.bool,
  // 手动控制状态的展示
  visible: _propTypes2.default.bool
};