var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import throttle from 'throttle-debounce/throttle';
import { addResizeListener, removeResizeListener } from '../Common/utils/resize-event';
import '../Common/css/Carousel.css';

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.state = {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };

    _this.throttledArrowClick = throttle(300, true, function (index) {
      _this.setActiveItem(index);
    });

    _this.throttledIndicatorHover = throttle(300, function (index) {
      _this.handleIndicatorHover(index);
    });
    return _this;
  }

  _createClass(Carousel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      addResizeListener(this.refs.root, this.resetItemPosition.bind(this));

      if (this.props.initialIndex < this.state.items.length && this.props.initialIndex >= 0) {
        this.setState({
          activeIndex: this.props.initialIndex
        });
      }

      this.startTimer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props, state) {
      if (state.activeIndex != this.state.activeIndex) {
        this.resetItemPosition(state.activeIndex);

        if (this.props.onChange) {
          this.props.onChange(this.state.activeIndex, state.activeIndex);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeResizeListener(this.refs.root, this.resetItemPosition.bind(this));
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({ hover: true });
      this.pauseTimer();
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({ hover: false });
      this.startTimer();
    }
  }, {
    key: 'itemInStage',
    value: function itemInStage(item, index) {
      var length = this.state.items.length;

      if (index === length - 1 && item.state.inStage && this.state.items[0].state.active || item.state.inStage && this.state.items[index + 1] && this.state.items[index + 1].state.active) {
        return 'left';
      } else if (index === 0 && item.state.inStage && this.state.items[length - 1].state.active || item.state.inStage && this.state.items[index - 1] && this.state.items[index - 1].state.active) {
        return 'right';
      }

      return false;
    }
  }, {
    key: 'handleButtonEnter',
    value: function handleButtonEnter(arrow) {
      var _this2 = this;

      this.state.items.forEach(function (item, index) {
        if (arrow === _this2.itemInStage(item, index)) {
          item.setState({ hover: true });
        }
      });
    }
  }, {
    key: 'handleButtonLeave',
    value: function handleButtonLeave() {
      this.state.items.forEach(function (item) {
        item.setState({ hover: false });
      });
    }
  }, {
    key: 'resetItemPosition',
    value: function resetItemPosition(oldIndex) {
      var _this3 = this;

      this.state.items.forEach(function (item, index) {
        item.translateItem(index, _this3.state.activeIndex, oldIndex);
      });
    }
  }, {
    key: 'playSlides',
    value: function playSlides() {
      var activeIndex = this.state.activeIndex;


      if (activeIndex < this.state.items.length - 1) {
        activeIndex++;
      } else {
        activeIndex = 0;
      }

      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: 'pauseTimer',
    value: function pauseTimer() {
      clearInterval(this.timer);
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      if (this.props.interval <= 0 || !this.props.autoplay) return;
      this.timer = setInterval(this.playSlides.bind(this), Number(this.props.interval));
    }
  }, {
    key: 'addItem',
    value: function addItem(item) {
      this.state.items.push(item);
      this.setActiveItem(0);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      this.state.items.splice(this.state.items.indexOf(item), 1);
      this.setActiveItem(0);
    }
  }, {
    key: 'setActiveItem',
    value: function setActiveItem(index) {
      var activeIndex = this.state.activeIndex;


      if (typeof index === 'string') {
        var filteredItems = this.state.items.filter(function (item) {
          return item.props.name === index;
        });

        if (filteredItems.length > 0) {
          index = this.state.items.indexOf(filteredItems[0]);
        }
      }

      index = Number(index);

      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' && console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }

      var length = this.state.items.length;

      if (index < 0) {
        activeIndex = length - 1;
      } else if (index >= length) {
        activeIndex = 0;
      } else {
        activeIndex = index;
      }

      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.setActiveItem(this.state.activeIndex - 1);
    }
  }, {
    key: 'next',
    value: function next() {
      this.setActiveItem(this.state.activeIndex + 1);
    }
  }, {
    key: 'handleIndicatorClick',
    value: function handleIndicatorClick(index) {
      this.setState({
        activeIndex: index
      });
    }
  }, {
    key: 'handleIndicatorHover',
    value: function handleIndicatorHover(index) {
      if (this.props.trigger === 'hover' && index !== this.state.activeIndex) {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          height = _props.height,
          arrow = _props.arrow,
          indicatorPosition = _props.indicatorPosition;
      var _state = this.state,
          hover = _state.hover,
          activeIndex = _state.activeIndex,
          items = _state.items;

      return React.createElement(
        'div',
        {
          ref: 'root',
          className: this.className('ishow-carousel', { 'ishow-carousel--card': this.iscard }),
          onMouseEnter: this.handleMouseEnter.bind(this),
          onMouseLeave: this.handleMouseLeave.bind(this)
        },
        React.createElement(
          'div',
          {
            className: 'ishow-carousel__container',
            style: { height: height } },
          React.createElement(
            Transition,
            { name: 'carousel-arrow-left' },
            arrow !== 'never' && React.createElement(
              View,
              { show: arrow === 'always' || hover },
              React.createElement(
                'button',
                {
                  className: 'ishow-carousel__arrow ishow-carousel__arrow--left',
                  onMouseEnter: this.handleButtonEnter.bind(this, 'left'),
                  onMouseLeave: this.handleButtonLeave.bind(this),
                  onClick: this.throttledArrowClick.bind(this, activeIndex - 1)
                },
                React.createElement('i', { className: 'ishow-icon-arrow-left' })
              )
            )
          ),
          React.createElement(
            Transition,
            { name: 'carousel-arrow-right' },
            arrow !== 'never' && React.createElement(
              View,
              { show: arrow === 'always' || hover },
              React.createElement(
                'button',
                {
                  className: 'ishow-carousel__arrow ishow-carousel__arrow--right',
                  onMouseEnter: this.handleButtonEnter.bind(this, 'right'),
                  onMouseLeave: this.handleButtonLeave.bind(this),
                  onClick: this.throttledArrowClick.bind(this, activeIndex + 1)
                },
                React.createElement('i', { className: 'ishow-icon-arrow-right' })
              )
            )
          ),
          this.props.children
        ),
        indicatorPosition !== 'none' && React.createElement(
          'ul',
          {
            className: this.classNames('ishow-carousel__indicators', {
              'ishow-carousel__indicators--outside': indicatorPosition === 'outside' || this.iscard
            })
          },
          items.map(function (item, index) {
            return React.createElement(
              'li',
              {
                key: index,
                className: _this4.classNames('ishow-carousel__indicator', { 'is-active': index === activeIndex }),
                onMouseEnter: _this4.throttledIndicatorHover.bind(_this4, index),
                onClick: _this4.handleIndicatorClick.bind(_this4, index)
              },
              React.createElement('button', { className: 'ishow-carousel__button' })
            );
          })
        )
      );
    }
  }, {
    key: 'iscard',
    get: function get() {
      var type = this.props.type;

      if (type) {
        return type === 'card' || type === 'flatcard';
      }
      return false;
    }
  }]);

  return Carousel;
}(Component);

export default Carousel;


Carousel.childContextTypes = {
  component: PropTypes.any
};

Carousel.propTypes = {
  initialIndex: PropTypes.number,
  height: PropTypes.string,
  trigger: PropTypes.string,
  autoplay: PropTypes.bool,
  interval: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  indicatorPosition: PropTypes.string,
  indicator: PropTypes.bool,
  arrow: PropTypes.string,
  type: PropTypes.oneOf(['card', 'flatcard']),
  onChange: PropTypes.func
};

Carousel.defaultProps = {
  initialIndex: 0,
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  indicator: true,
  arrow: 'hover'
};