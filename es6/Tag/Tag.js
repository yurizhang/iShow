var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component, View } from '../Common/plugs/index.js';
import Transition from '../Message/transition';
import '../Common/css/Tag.css';

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


      return React.createElement(
        Transition,
        { name: closeTransition ? '' : 'ishow-zoom-in-center' },
        React.createElement(
          View,
          { key: this.state.visible, show: this.state.visible },
          React.createElement(
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
            closable && React.createElement('i', { className: 'ishow-tag__close ishow-icon-close', onClick: this.handleClose.bind(this) })
          )
        )
      );
    }
  }]);

  return Tag;
}(Component);

export default Tag;


Tag.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.string,
  hit: PropTypes.bool,
  color: PropTypes.string,
  closeTransition: PropTypes.bool,
  onClose: PropTypes.func
};