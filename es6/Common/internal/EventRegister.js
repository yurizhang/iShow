var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import { Component } from 'react';
import { require_condition } from '../utils';

var windowKey = Symbol.for("er_register_map");
var registerMap = window[windowKey] = window[windowKey] || {
  ids: {}
};

var not_null = function not_null(t) {
  return t != null;
};

var hasRegistered = function hasRegistered(_ref) {
  var id = _ref.id;

  return not_null(registerMap.ids[id]);
};

var cleanRegister = function cleanRegister(props) {
  var target = props.target,
      eventName = props.eventName,
      func = props.func,
      isUseCapture = props.isUseCapture,
      id = props.id;

  if (hasRegistered(props)) {
    target.removeEventListener(eventName, func, isUseCapture);
    delete registerMap.ids[id];
  }
};

var doRegister = function doRegister(props) {
  var id = props.id,
      eventName = props.eventName,
      func = props.func,
      isUseCapture = props.isUseCapture;

  registerMap.ids[id] = id;
  document.addEventListener(eventName, func, isUseCapture);
};

/**
 * register events that hooked up react lifecycle
 */

var EventRegister = function (_Component) {
  _inherits(EventRegister, _Component);

  function EventRegister() {
    _classCallCheck(this, EventRegister);

    return _possibleConstructorReturn(this, (EventRegister.__proto__ || Object.getPrototypeOf(EventRegister)).apply(this, arguments));
  }

  _createClass(EventRegister, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          eventName = _props.eventName,
          id = _props.id;

      eventName = eventName.toLowerCase();
      eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName;
      this.cached = Object.assign({}, this.props, { eventName: eventName });

      require_condition(typeof id === 'string', 'id prop is required');
      require_condition(!hasRegistered(this.cached), 'id: ' + id + ' has been registered');

      doRegister(this.cached);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cleanRegister(this.cached);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return EventRegister;
}(Component);

export default EventRegister;


EventRegister.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  isUseCapture: PropTypes.bool
};