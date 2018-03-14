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

require('../Common/css/Tag.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_Component) {
  _inherits(Tag, _Component);

  function Tag(props) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Tag, [{
    key: 'handleClose',
    value: function handleClose() {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        if (_this2.props.onClose) {
          _this2.props.onClose();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          hit = _props.hit,
          closable = _props.closable,
          closeTransition = _props.closeTransition,
          color = _props.color;


      return _react2.default.createElement(
        _transition2.default,
        { name: closeTransition ? '' : 'ishow-zoom-in-center' },
        _react2.default.createElement(
          _index.View,
          { key: this.state.visible, show: this.state.visible },
          _react2.default.createElement(
            'span',
            {
              style: this.style({
                backgroundColor: color
              }),
              className: this.className('ishow-tag', type && 'ishow-tag--' + type, {
                'is-hit': hit
              })
            },
            this.props.children,
            closable && _react2.default.createElement('i', { className: 'ishow-tag__close ishow-icon-close', onClick: this.handleClose.bind(this) })
          )
        )
      );
    }
  }]);

  return Tag;
}(_index2.default);

exports.default = Tag;


Tag.propTypes = {
  closable: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  hit: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  closeTransition: _propTypes2.default.bool,
  onClose: _propTypes2.default.func
};