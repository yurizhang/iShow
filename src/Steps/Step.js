/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Step.css';
export default class Step extends Component {
  static defaultProps = {
    status: 'wait'
  };

  render(){
    const {
      title,
      icon,
      description,
      status,
      direction,
      style,
      lineStyle,
      stepNumber
    } = this.props;
    const directionClass = `is-${direction}`;
    const statusClass = `is-${status}`;
    const iconNode = icon
      ? <i className={`ishow-icon-${icon}`} />
      : <div>{stepNumber}</div>;

    return (
      <div
        style={this.style(style)}
        className={this.className('ishow-step', directionClass)}
      >
        <div
          className={this.classNames('ishow-step__head', statusClass, {
            'is-text': !icon
          })}
        >
          <div
            className={this.classNames('ishow-step__line', directionClass, {
              'is-icon': icon
            })}
          >
            <i className="ishow-step__line-inner" style={lineStyle} />
          </div>
          <span className="ishow-step__icon">
            {status !== 'success' && status !== 'error'
              ? iconNode
              : <i
                  className={
                    'ishow-icon-' + (status === 'success' ? 'check' : 'close')
                  }
                />}
          </span>
        </div>
        <div className="ishow-step__main">
          <div
            ref="title"
            className={this.classNames('ishow-step__title', statusClass)}
          >
            {title}
          </div>
          <div className={this.classNames('ishow-step__description', statusClass)}>
            {description}
          </div>
        </div>
      </div>
    );
  }
}

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
