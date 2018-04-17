var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js';

import Tooltip from '../Tooltip';

var SliderButton = function (_Component) {
  _inherits(SliderButton, _Component);

  function SliderButton(props) {
    _classCallCheck(this, SliderButton);

    var _this = _possibleConstructorReturn(this, (SliderButton.__proto__ || Object.getPrototypeOf(SliderButton)).call(this, props));

    _this.state = {
      hovering: false,
      dragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0
    };
    return _this;
  }

  _createClass(SliderButton, [{
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({
        hovering: true
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        hovering: false
      });
    }
  }, {
    key: 'onButtonDown',
    value: function onButtonDown(event) {
      if (this.disabled()) return;

      this.onDragStart(event);

      window.addEventListener('mousemove', this.onDragging.bind(this));
      window.addEventListener('mouseup', this.onDragEnd.bind(this));
      window.addEventListener('contextmenu', this.onDragEnd.bind(this));
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.setState({
        dragging: true,
        startX: event.clientX,
        startY: event.clientY,
        startPosition: parseInt(this.currentPosition(), 10)
      });
    }
  }, {
    key: 'onDragging',
    value: function onDragging(event) {
      if (this.state.dragging) {
        this.state.currentX = event.clientX;
        this.state.currentY = event.clientY;

        var diff = void 0;

        if (this.props.vertical) {
          diff = (this.state.startY - this.state.currentY) / this.parent().sliderSize() * 100;
        } else {
          diff = (this.state.currentX - this.state.startX) / this.parent().sliderSize() * 100;
        }

        this.state.newPosition = this.state.startPosition + diff;

        this.setPosition(this.state.newPosition);
        this.forceUpdate();
      }
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      var _this2 = this;

      if (this.state.dragging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(function () {
          _this2.setState({
            dragging: false
          }, function () {
            _this2.setPosition(_this2.state.newPosition);
          });
        }, 0);

        window.removeEventListener('mousemove', this.onDragging.bind(this));
        window.removeEventListener('mouseup', this.onDragEnd.bind(this));
        window.removeEventListener('contextmenu', this.onDragEnd.bind(this));
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(newPosition) {
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }

      var lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
      var steps = Math.round(newPosition / lengthPerStep);
      var value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();

      this.props.onChange(parseFloat(value.toFixed(this.precision())));
    }

    /* Computed Methods */

  }, {
    key: 'formatValue',
    value: function formatValue() {
      var formatTooltip = this.parent().props.formatTooltip;


      if (formatTooltip instanceof Function) {
        return formatTooltip(this.props.value);
      }

      return this.props.value;
    }
  }, {
    key: 'disabled',
    value: function disabled() {
      return this.parent().props.disabled;
    }
  }, {
    key: 'max',
    value: function max() {
      return this.parent().props.max;
    }
  }, {
    key: 'min',
    value: function min() {
      return this.parent().props.min;
    }
  }, {
    key: 'step',
    value: function step() {
      return this.parent().props.step;
    }
  }, {
    key: 'precision',
    value: function precision() {
      return this.parent().state.precision;
    }
  }, {
    key: 'currentPosition',
    value: function currentPosition() {
      return (this.props.value - this.min()) / (this.max() - this.min()) * 100 + '%';
    }
  }, {
    key: 'wrapperStyle',
    value: function wrapperStyle() {
      return this.props.vertical ? { bottom: this.currentPosition() } : { left: this.currentPosition() };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hovering = _state.hovering,
          dragging = _state.dragging;


      return React.createElement(
        'div',
        {
          ref: 'button',
          className: this.classNames('el-slider__button-wrapper', {
            'hover': hovering,
            'dragging': dragging
          }),
          style: this.wrapperStyle(),
          onMouseEnter: this.handleMouseEnter.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this),
          onMouseDown: this.onButtonDown.bind(this) },
        React.createElement(
          Tooltip,
          { ref: 'tooltip', placement: 'top', content: React.createElement(
              'span',
              null,
              this.formatValue()
            ), disabled: !this.parent().props.showTooltip },
          React.createElement('div', { className: this.classNames('el-slider__button', {
              'hover': this.state.hovering,
              'dragging': this.state.dragging
            }) })
        )
      );
    }
  }]);

  return SliderButton;
}(Component);

export default SliderButton;


SliderButton.contextTypes = {
  component: PropTypes.any
};

SliderButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  vertical: PropTypes.bool
};

SliderButton.defaultProps = {
  value: 0
};