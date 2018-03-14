var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import { addResizeListener, removeResizeListener } from '../Common/resize-event';

import { getScrollBarWidth } from './scrollbar-width';
import { Bar } from './Bar';
import '../Common/css/Scrollbar.css';

export var Scrollbar = function (_Component) {
  _inherits(Scrollbar, _Component);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));

    _this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
    return _this;
  }

  _createClass(Scrollbar, [{
    key: 'wrap',
    value: function wrap() {
      return this.refs.wrap;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.native) return;
      var handler = this.update.bind(this);
      var rafId = requestAnimationFrame(handler);
      this.cleanRAF = function () {
        cancelAnimationFrame(rafId);
      };
      if (!this.props.noresize) {
        addResizeListener(this.refs.resize, handler);
        this.cleanResize = function () {
          removeResizeListener(_this2.refs.resize, handler);
        };
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cleanRAF();
      this.cleanResize && this.cleanResize();
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var wrap = this.wrap;
      this.setState({
        moveY: wrap.scrollTop * 100 / wrap.clientHeight,
        moveX: wrap.scrollLeft * 100 / wrap.clientWidth
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var heightPercentage = void 0,
          widthPercentage = void 0;
      var wrap = this.wrap;
      if (!wrap) return;

      heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

      var sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
      var sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';

      this.setState({ sizeHeight: sizeHeight, sizeWidth: sizeWidth });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      /* eslint-disable */
      var _props = this.props,
          native = _props.native,
          viewStyle = _props.viewStyle,
          wrapStyle = _props.wrapStyle,
          viewClass = _props.viewClass,
          children = _props.children,
          viewComponent = _props.viewComponent,
          wrapClass = _props.wrapClass,
          noresize = _props.noresize,
          className = _props.className,
          others = _objectWithoutProperties(_props, ['native', 'viewStyle', 'wrapStyle', 'viewClass', 'children', 'viewComponent', 'wrapClass', 'noresize', 'className']);

      var _state = this.state,
          moveX = _state.moveX,
          moveY = _state.moveY,
          sizeWidth = _state.sizeWidth,
          sizeHeight = _state.sizeHeight;
      /* eslint-enable */

      var style = wrapStyle;
      var gutter = getScrollBarWidth();
      if (gutter) {
        var gutterWith = '-' + gutter + 'px';
        if (Array.isArray(wrapStyle)) {
          style = Object.assign.apply(null, [].concat(_toConsumableArray(wrapStyle), [{ marginRight: gutterWith, marginBottom: gutterWith }]));
        } else {
          style = Object.assign({}, wrapStyle, { marginRight: gutterWith, marginBottom: gutterWith });
        }
      }

      var view = React.createElement(viewComponent, {
        className: this.classNames('ishow-scrollbar__view', viewClass),
        style: viewStyle,
        ref: 'resize'
      }, children);

      var nodes = void 0;
      if (!native) {
        var wrap = React.createElement(
          'div',
          Object.assign({}, others, {
            ref: 'wrap',
            key: 0,
            style: style,
            onScroll: this.handleScroll.bind(this),
            className: this.classNames(wrapClass, 'ishow-scrollbar__wrap', gutter ? '' : 'ishow-scrollbar__wrap--hidden-default')
          }),
          view
        );
        nodes = [wrap, React.createElement(Bar, { key: 1, move: moveX, size: sizeWidth, getParentWrap: function getParentWrap() {
            return _this3.wrap;
          } }), React.createElement(Bar, { key: 2, move: moveY, size: sizeHeight, getParentWrap: function getParentWrap() {
            return _this3.wrap;
          }, vertical: true })];
      } else {
        nodes = [React.createElement(
          'div',
          Object.assign({}, others, {
            key: 0,
            ref: 'wrap',
            className: this.classNames(wrapClass, 'ishow-scrollbar__wrap'),
            style: style }),
          view
        )];
      }

      return React.createElement('div', { className: this.classNames('ishow-scrollbar', className) }, nodes);
    }
  }]);

  return Scrollbar;
}(Component);

Scrollbar.propTypes = {
  native: PropTypes.bool,
  wrapStyle: PropTypes.object,
  wrapClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewStyle: PropTypes.object,
  className: PropTypes.string,
  viewComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  noresize: PropTypes.bool
};

Scrollbar.defaultProps = {
  viewComponent: 'div'
};