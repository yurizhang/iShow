var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Step.css';

var Step = function (_Component) {
  _inherits(Step, _Component);

  function Step() {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).apply(this, arguments));
  }

  _createClass(Step, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          icon = _props.icon,
          description = _props.description,
          status = _props.status,
          direction = _props.direction,
          style = _props.style,
          lineStyle = _props.lineStyle,
          stepNumber = _props.stepNumber;

      var directionClass = 'is-' + direction;
      var statusClass = 'is-' + status;
      var iconNode = icon ? React.createElement('i', { className: 'ishow-icon-' + icon }) : React.createElement(
        'div',
        null,
        stepNumber
      );

      return React.createElement(
        'div',
        {
          style: this.style(style),
          className: this.className('ishow-step', directionClass)
        },
        React.createElement(
          'div',
          {
            className: this.classNames('ishow-step__head', statusClass, {
              'is-text': !icon
            })
          },
          React.createElement(
            'div',
            {
              className: this.classNames('ishow-step__line', directionClass, {
                'is-icon': icon
              })
            },
            React.createElement('i', { className: 'ishow-step__line-inner', style: lineStyle })
          ),
          React.createElement(
            'span',
            { className: 'ishow-step__icon' },
            status !== 'success' && status !== 'error' ? iconNode : React.createElement('i', {
              className: 'ishow-icon-' + (status === 'success' ? 'check' : 'close')
            })
          )
        ),
        React.createElement(
          'div',
          { className: 'ishow-step__main' },
          React.createElement(
            'div',
            {
              ref: 'title',
              className: this.classNames('ishow-step__title', statusClass)
            },
            title
          ),
          React.createElement(
            'div',
            { className: this.classNames('ishow-step__description', statusClass) },
            description
          )
        )
      );
    }
  }]);

  return Step;
}(Component);

Step.defaultProps = {
  status: 'wait'
};
export default Step;


Step.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  status: PropTypes.string,
  direction: PropTypes.string,
  style: PropTypes.object,
  lineStyle: PropTypes.object,
  stepNumber: PropTypes.number
};