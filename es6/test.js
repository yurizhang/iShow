var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button as Button1 } from "ishow";
import Button from "ishow/lib/Button";

//import Button from "../lib/Button"; 
//import registerServiceWorker from './registerServiceWorker';

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'header',
          { className: 'App-header' },
          React.createElement(
            'h1',
            { className: 'App-title' },
            'Welcome to React'
          )
        ),
        React.createElement(
          'p',
          { className: 'App-intro' },
          '\u5F00\u59CB, edit ',
          React.createElement(
            'code',
            null,
            'src/App.js'
          ),
          ' and save to reload.22',
          React.createElement(
            Button1,
            { type: 'warning' },
            '\u8B66\u544A'
          ),
          React.createElement(
            Button,
            { type: 'success' },
            '\u6210\u529F'
          )
        )
      );
    }
  }]);

  return App;
}(Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//registerServiceWorker();