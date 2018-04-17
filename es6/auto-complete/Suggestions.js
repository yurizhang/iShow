var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../Common/utils/popper';
import Transition from '../Message/transition';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import { Scrollbar } from '../Scrollbar';
import '../Common/css/Autocomplete.css';

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
      var reference = ReactDOM.findDOMNode(this.parent().inputNode);

      this.popperJS = new Popper(reference, this.refs.popper, {
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


      return React.createElement(
        Transition,
        { name: 'ishow-zoom-in-top', onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
        React.createElement(
          View,
          { show: showPopper },
          React.createElement(
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
            React.createElement(
              Scrollbar,
              {
                viewComponent: 'ul',
                wrapClass: 'ishow-autocomplete-suggestion__wrap',
                viewClass: 'ishow-autocomplete-suggestion__list'
              },
              loading ? React.createElement(
                'li',
                null,
                React.createElement('i', { className: 'ishow-icon-loading' })
              ) : suggestions.map(function (item, index) {
                return React.createElement(
                  'li',
                  {
                    key: index,
                    className: _this2.classNames({ 'highlighted': highlightedIndex === index }),
                    onClick: _this2.onSelect.bind(_this2, item) },
                  !customItem ? item.value : React.createElement(customItem, {
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
}(Component);

export default Suggestions;


Suggestions.contextTypes = {
  component: PropTypes.any
};