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

var _transition = require('../Message/transition');

var _transition2 = _interopRequireDefault(_transition);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _Scrollbar = require('../Scrollbar');

require('../Common/css/Autocomplete.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions(props) {
    _classCallCheck(this, Suggestions);

    var _this = _possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).call(this, props));

    _this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
    return _this;
  }

  _createClass(Suggestions, [{
    key: 'onVisibleChange',
    value: function onVisibleChange(visible, inputWidth) {
      this.setState({
        dropdownWidth: inputWidth,
        showPopper: visible
      });
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'onSelect',
    value: function onSelect(item) {
      this.parent().select(item);
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      var reference = _reactDom2.default.findDOMNode(this.parent().inputNode);

      this.popperJS = new _popper2.default(reference, this.refs.popper, {
        gpuAcceleration: false,
        forceAbsolute: true
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
      var _this2 = this;

      var customItem = this.parent().props.customItem;
      var _parent$state = this.parent().state,
          loading = _parent$state.loading,
          highlightedIndex = _parent$state.highlightedIndex;
      var suggestions = this.props.suggestions;
      var _state = this.state,
          showPopper = _state.showPopper,
          dropdownWidth = _state.dropdownWidth;


      return _react2.default.createElement(
        _transition2.default,
        { name: 'ishow-zoom-in-top', onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
        _react2.default.createElement(
          _index.View,
          { show: showPopper },
          _react2.default.createElement(
            'div',
            {
              ref: 'popper',
              className: this.classNames('ishow-autocomplete-suggestion', 'ishow-popper', {
                'is-loading': loading
              }),
              style: {
                width: dropdownWidth,
                zIndex: 1
              }
            },
            _react2.default.createElement(
              _Scrollbar.Scrollbar,
              {
                viewComponent: 'ul',
                wrapClass: 'ishow-autocomplete-suggestion__wrap',
                viewClass: 'ishow-autocomplete-suggestion__list'
              },
              loading ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('i', { className: 'ishow-icon-loading' })
              ) : suggestions.map(function (item, index) {
                return _react2.default.createElement(
                  'li',
                  {
                    key: index,
                    className: _this2.classNames({ 'highlighted': highlightedIndex === index }),
                    onClick: _this2.onSelect.bind(_this2, item) },
                  !customItem ? item.value : _react2.default.createElement(customItem, {
                    index: index,
                    item: item
                  })
                );
              })
            )
          )
        )
      );
    }
  }]);

  return Suggestions;
}(_index2.default);

exports.default = Suggestions;


Suggestions.contextTypes = {
  component: _propTypes2.default.any
};