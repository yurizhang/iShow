var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import React from 'react';
import ReactDOM from 'react-dom';

import MessageBox from './MessageBox';

function alert(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, props);

  return next(props);
}

function confirm(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'confirm',
    showCancelButton: true
  }, props);

  return next(props);
}

function prompt(message, title, props) {
  if ((typeof title === 'undefined' ? 'undefined' : _typeof(title)) === 'object') {
    props = title;
  }

  props = Object.assign({ title: title, message: message,
    modal: 'prompt',
    showCancelButton: true,
    showInput: true
  }, props);

  return next(props);
}

function msgbox(props) {
  return next(props);
}

function next(props) {
  return new Promise(function (resolve, reject) {
    var div = document.createElement('div');

    document.body.appendChild(div);

    if (props.lockScroll !== false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    var component = React.createElement(MessageBox, Object.assign({}, props, {
      promise: { resolve: resolve, reject: reject },
      willUnmount: function willUnmount() {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');
      }
    }));

    ReactDOM.render(component, div);
  });
}

export default {
  alert: alert,
  confirm: confirm,
  prompt: prompt,
  msgbox: msgbox
};