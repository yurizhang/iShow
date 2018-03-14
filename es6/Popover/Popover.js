var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../Common/utils/popper';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Popover.css';

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

      this.element = ReactDOM.findDOMNode(this);
      this.reference = ReactDOM.findDOMNode(this.refs.reference);

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

      this.popperJS = new Popper(this.reference, this.refs.popper, {
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


      return React.createElement(
        'span',
        null,
        React.createElement(
          Transition,
          { name: transition, onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
          React.createElement(
            View,
            { show: this.state.showPopper },
            React.createElement(
              'div',
              { ref: 'popper', className: this.className('ishow-popover', popperClass), style: this.style({ width: Number(width) }) },
              title && React.createElement(
                'div',
                { className: 'ishow-popover__title' },
                title
              ),
              content,
              visibleArrow && React.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
            )
          )
        ),
        React.cloneElement(React.Children.only(this.props.children), { ref: 'reference' })
      );
    }
  }]);

  return Popover;
}(Component);

Popover.defaultProps = {
  visibleArrow: true,
  transition: 'fade-in-linear',
  trigger: 'click',
  placement: 'bottom',
  width: 150
};
export default Popover;


Popover.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  trigger: PropTypes.oneOf(['click', 'focus', 'hover']),
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  popperClass: PropTypes.string,
  transition: PropTypes.string,
  visible: PropTypes.bool,
  visibleArrow: PropTypes.bool
};