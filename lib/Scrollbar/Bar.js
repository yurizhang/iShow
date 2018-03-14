'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _util = require('./util');

var _dom = require('../Common/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法

var Bar = exports.Bar = function (_Component) {
  _inherits(Bar, _Component);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: 'bar',
    value: function bar() {
      return _util.BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
    }
  }, {
    key: 'wrap',
    value: function wrap() {
      return this.props.getParentWrap();
    }
  }, {
    key: 'clickThumbHandler',
    value: function clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    }
  }, {
    key: 'clickTrackHandler',
    value: function clickTrackHandler(e) {
      var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      var thumbHalf = this.refs.thumb[this.bar.offset] / 2;
      var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.root[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: 'startDrag',
    value: function startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      (0, _dom.on)(document, 'mousemove', this.mouseMoveDocumentHandler);
      (0, _dom.on)(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = function () {
        return false;
      };
    }
  }, {
    key: 'mouseMoveDocumentHandler',
    value: function mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      var prevPage = this[this.bar.axis];

      if (!prevPage) return;

      var offset = e[this.bar.client] - this.root.getBoundingClientRect()[this.bar.direction];
      var thumbClickPosition = this.refs.thumb[this.bar.offset] - prevPage;
      var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.root[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: 'mouseUpDocumentHandler',
    value: function mouseUpDocumentHandler() {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      (0, _dom.off)(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          move = _props.move;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.classNames('ishow-scrollbar__bar', 'is-' + this.bar.key),
          onMouseDown: this.clickTrackHandler.bind(this) },
        _react2.default.createElement('div', {
          ref: 'thumb',
          className: 'ishow-scrollbar__thumb',
          onMouseDown: this.clickThumbHandler.bind(this),
          style: (0, _util.renderThumbStyle)({ size: size, move: move, bar: this.bar }) })
      );
    }
  }]);

  return Bar;
}(_index2.default);

Bar.propTypes = {
  vertical: _propTypes2.default.bool,
  size: _propTypes2.default.string,
  move: _propTypes2.default.number,
  getParentWrap: _propTypes2.default.func.isRequired

};