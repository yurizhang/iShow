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

require('../Common/css/Loading.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Loading = function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.enableScroll();
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      if (this.props.fullscreen) {
        this.disableScroll();

        return {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999
        };
      } else {
        this.enableScroll();

        return {
          position: 'relative'
        };
      }
    }
  }, {
    key: 'documentBody',
    value: function documentBody() {
      return document.body;
    }
  }, {
    key: 'disableScroll',
    value: function disableScroll() {
      var documentBody = this.documentBody();
      if (documentBody) {
        documentBody.style.setProperty('overflow', 'hidden');
      }
    }
  }, {
    key: 'enableScroll',
    value: function enableScroll() {
      var documentBody = this.documentBody();
      if (documentBody) {
        documentBody.style.removeProperty('overflow');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          fullscreen = _props.fullscreen,
          text = _props.text;


      return _react2.default.createElement(
        'div',
        { style: this.style(this.getStyle()), className: this.className() },
        loading && _react2.default.createElement(
          'div',
          {
            style: {
              display: 'block',
              position: 'absolute',
              zIndex: 657,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            } },
          _react2.default.createElement(
            'div',
            { className: this.classNames('ishow-loading-spinner', {
                'is-full-screen': fullscreen
              }), style: {
                position: 'absolute',
                display: 'inline-block',
                left: 0
              } },
            _react2.default.createElement(
              'svg',
              { className: 'circular', viewBox: '25 25 50 50' },
              _react2.default.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
            ),
            text && _react2.default.createElement(
              'p',
              { className: 'ishow-loading-text' },
              text
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return Loading;
}(_index2.default);

exports.default = Loading;


Loading.propTypes = {
  loading: _propTypes2.default.bool,
  fullscreen: _propTypes2.default.bool,
  text: _propTypes2.default.string
};

Loading.defaultProps = {
  loading: true
};