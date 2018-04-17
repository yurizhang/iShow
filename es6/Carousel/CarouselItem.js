var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法 //提供style, classname方法
import '../Common/css/Carousel-item.css';

var CarouselItem = function (_Component) {
  _inherits(CarouselItem, _Component);

  function CarouselItem(props) {
    _classCallCheck(this, CarouselItem);

    var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

    _this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
    return _this;
  }

  _createClass(CarouselItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parent().addItem(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeItem(this);
    }
  }, {
    key: 'processIndex',
    value: function processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }

      return index;
    }
  }, {
    key: 'calculateTranslate',
    value: function calculateTranslate(index, activeIndex, parentWidth) {
      var denominator = this.isFlat ? 3 : 4;
      if (this.state.inStage) {
        return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
      } else if (index < activeIndex) {
        return -(1 + this.CARD_SCALE) * parentWidth / denominator;
      } else {
        return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
      }
    }
  }, {
    key: 'translateItem',
    value: function translateItem(index, activeIndex, oldIndex) {
      var parent = ReactDOM.findDOMNode(this.parent());
      var parentWidth = parent.offsetWidth;
      var length = this.parent().state.items.length;

      if (!this.parent().iscard && oldIndex !== undefined) {
        this.state.animating = index === activeIndex || index === oldIndex;
      }

      if (index !== activeIndex && length > 2) {
        index = this.processIndex(index, activeIndex, length);
      }

      if (this.parent().iscard) {
        this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.state.active = index === activeIndex;
        this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
        this.state.scale = this.state.active ? 1 : this.CARD_SCALE;
      } else {
        this.state.active = index === activeIndex;
        this.state.translate = parentWidth * (index - activeIndex);
      }

      this.state.ready = true;

      this.forceUpdate();
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick() {
      if (this.parent().iscard) {
        var index = this.parent().state.items.indexOf(this);
        this.parent().setActiveItem(index);
      }
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hover = _state.hover,
          translate = _state.translate,
          scale = _state.scale,
          active = _state.active,
          ready = _state.ready,
          inStage = _state.inStage,
          animating = _state.animating;


      return React.createElement(
        View,
        { show: ready },
        React.createElement(
          'div',
          {
            className: this.className('ishow-carousel__item', {
              'is-active': active,
              'ishow-carousel__item--card': this.parent().iscard,
              'is-in-stage': inStage,
              'is-hover': hover,
              'is-animating': animating
            }),
            onClick: this.handleItemClick.bind(this),
            style: {
              msTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
              WebkitTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
              transform: 'translateX(' + translate + 'px) scale(' + scale + ')'
            } },
          this.parent().iscard && React.createElement(
            View,
            { show: !active },
            React.createElement('div', { className: 'ishow-carousel__mask' })
          ),
          this.props.children
        )
      );
    }
  }, {
    key: 'isFlat',
    get: function get() {
      return this.parent().props.type === 'flatcard';
    }
  }, {
    key: 'CARD_SCALE',
    get: function get() {
      return this.isFlat ? 1 : 0.83;
    }
  }, {
    key: 'calculateWidth',
    get: function get() {
      if (this.isFlat) {
        return parseInt(100 / 3) + '%';
      }
    }
  }]);

  return CarouselItem;
}(Component);

export default CarouselItem;


CarouselItem.contextTypes = {
  component: PropTypes.any
};