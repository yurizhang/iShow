var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export var MountBody = function (_Component) {
  _inherits(MountBody, _Component);

  function MountBody() {
    _classCallCheck(this, MountBody);

    return _possibleConstructorReturn(this, (MountBody.__proto__ || Object.getPrototypeOf(MountBody)).apply(this, arguments));
  }

  _createClass(MountBody, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var c = React.cloneElement(this.props.children);
      this.tnode = document.createElement('div');
      document.body.appendChild(this.tnode);
      ReactDOM.render(c, this.tnode);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(this.tnode);
      document.body.removeChild(this.tnode);
    }
  }, {
    key: 'contains',
    value: function contains(evt) {
      var parent = this.tnode.childNodes[0];
      var rect = parent.getBoundingClientRect();
      var isContain = evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
      return isContain;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return MountBody;
}(Component);