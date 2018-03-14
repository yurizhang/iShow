'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrollbar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _resizeEvent = require('../Common/resize-event');

var _scrollbarWidth = require('./scrollbar-width');

var _Bar = require('./Bar');

require('../Common/css/Scrollbar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Scrollbar = exports.Scrollbar = function (_Component) {
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
        (0, _resizeEvent.addResizeListener)(this.refs.resize, handler);
        this.cleanResize = function () {
          (0, _resizeEvent.removeResizeListener)(_this2.refs.resize, handler);
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
      var gutter = (0, _scrollbarWidth.getScrollBarWidth)();
      if (gutter) {
        var gutterWith = '-' + gutter + 'px';
        if (Array.isArray(wrapStyle)) {
          style = Object.assign.apply(null, [].concat(_toConsumableArray(wrapStyle), [{ marginRight: gutterWith, marginBottom: gutterWith }]));
        } else {
          style = Object.assign({}, wrapStyle, { marginRight: gutterWith, marginBottom: gutterWith });
        }
      }

      var view = _react2.default.createElement(viewComponent, {
        className: this.classNames('ishow-scrollbar__view', viewClass),
        style: viewStyle,
        ref: 'resize'
      }, children);

      var nodes = void 0;
      if (!native) {
        var wrap = _react2.default.createElement(
          'div',
          _extends({}, others, {
            ref: 'wrap',
            key: 0,
            style: style,
            onScroll: this.handleScroll.bind(this),
            className: this.classNames(wrapClass, 'ishow-scrollbar__wrap', gutter ? '' : 'ishow-scrollbar__wrap--hidden-default')
          }),
          view
        );
        nodes = [wrap, _react2.default.createElement(_Bar.Bar, { key: 1, move: moveX, size: sizeWidth, getParentWrap: function getParentWrap() {
            return _this3.wrap;
          } }), _react2.default.createElement(_Bar.Bar, { key: 2, move: moveY, size: sizeHeight, getParentWrap: function getParentWrap() {
            return _this3.wrap;
          }, vertical: true })];
      } else {
        nodes = [_react2.default.createElement(
          'div',
          _extends({}, others, {
            key: 0,
            ref: 'wrap',
            className: this.classNames(wrapClass, 'ishow-scrollbar__wrap'),
            style: style }),
          view
        )];
      }

      return _react2.default.createElement('div', { className: this.classNames('ishow-scrollbar', className) }, nodes);
    }
  }]);

  return Scrollbar;
}(_index2.default);

Scrollbar.propTypes = {
  native: _propTypes2.default.bool,
  wrapStyle: _propTypes2.default.object,
  wrapClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  viewClass: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  viewStyle: _propTypes2.default.object,
  className: _propTypes2.default.string,
  viewComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  noresize: _propTypes2.default.bool
};

Scrollbar.defaultProps = {
  viewComponent: 'div'
};