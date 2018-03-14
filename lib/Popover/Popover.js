'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _popper = require('../Common/utils/popper');

var _popper2 = _interopRequireDefault(_popper);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

require('../Common/css/Popover.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Popover = function (_Component) {
  _inherits(Popover, _Component);

  function Popover(props) {
    _classCallCheck(this, Popover);

    var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(Popover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var trigger = this.props.trigger,
          popper = this.refs.popper;

      this.element = _reactDom2.default.findDOMNode(this);
      this.reference = _reactDom2.default.findDOMNode(this.refs.reference);

      if (this.reference === null) return;

      if (trigger === 'click') {
        this.reference.addEventListener('click', function () {
          _this2.setState({
            showPopper: !_this2.state.showPopper
          });
        });

        document.addEventListener('click', function (e) {
          if (!_this2.element || _this2.element.contains(e.target) || !_this2.reference || _this2.reference.contains(e.target) || !popper || popper.contains(e.target)) return;

          _this2.setState({
            showPopper: false
          });
        });
      } else if (trigger === 'hover') {
        this.reference.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.reference.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

        popper.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        popper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      } else {
        if (this.reference.nodeName === 'INPUT' || this.reference.nodeName === 'TEXTAREA') {
          this.reference.addEventListener('focus', function () {
            _this2.setState({ showPopper: true });
          });
          this.reference.addEventListener('blur', function () {
            _this2.setState({ showPopper: false });
          });
        } else {
          this.reference.addEventListener('mousedown', function () {
            _this2.setState({ showPopper: true });
          });
          this.reference.addEventListener('mouseup', function () {
            _this2.setState({ showPopper: false });
          });
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.visible !== this.props.visible) {
        this.setState({
          showPopper: props.visible
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.reference.parentNode.replaceChild(this.reference.cloneNode(true), this.reference);
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      clearTimeout(this.timer);

      this.setState({
        showPopper: true
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      var _this3 = this;

      this.timer = setTimeout(function () {
        _this3.setState({
          showPopper: false
        });
      }, 200);
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      if (this.refs.arrow) {
        this.refs.arrow.setAttribute('x-arrow', '');
      }

      this.popperJS = new _popper2.default(this.reference, this.refs.popper, {
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
          transition = _props.transition,
          popperClass = _props.popperClass,
          width = _props.width,
          title = _props.title,
          content = _props.content,
          visibleArrow = _props.visibleArrow;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          _transition2.default,
          { name: transition, onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
          _react2.default.createElement(
            _index.View,
            { show: this.state.showPopper },
            _react2.default.createElement(
              'div',
              { ref: 'popper', className: this.className('ishow-popover', popperClass), style: this.style({ width: Number(width) }) },
              title && _react2.default.createElement(
                'div',
                { className: 'ishow-popover__title' },
                title
              ),
              content,
              visibleArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
            )
          )
        ),
        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), { ref: 'reference' })
      );
    }
  }]);

  return Popover;
}(_index2.default);

Popover.defaultProps = {
  visibleArrow: true,
  transition: 'fade-in-linear',
  trigger: 'click',
  placement: 'bottom',
  width: 150
};
exports.default = Popover;


Popover.propTypes = {
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  placement: _propTypes2.default.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  trigger: _propTypes2.default.oneOf(['click', 'focus', 'hover']),
  title: _propTypes2.default.string,
  content: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  popperClass: _propTypes2.default.string,
  transition: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  visibleArrow: _propTypes2.default.bool
};