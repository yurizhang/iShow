/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Progress.css'
// type PathStyle = {
//   strokeDasharray: string,
//   strokeDashoffset: string,
//   transition: string
// };

export default class Progress extends Component {
  static defaultProps = {
    type: 'line',
    percentage: 0,
    strokeWidth: 6,
    width: 126,
    showText: true,
    textInside: false
  };


  relativeStrokeWidth() {
    const { strokeWidth, width } = this.props;
    return (strokeWidth / width * 100).toFixed(1);
  }

  trackPath() {
    const radius = parseInt(
      50 - parseFloat(this.relativeStrokeWidth()) / 2,
      10
    );
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
  }

  perimeter() {
    const radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
    return 2 * Math.PI * radius;
  }

  circlePathStyle() {
    const perimeter = this.perimeter();
    return {
      strokeDasharray: `${perimeter}px,${perimeter}px`,
      strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
    };
  }

  stroke() {
    let ret;
    switch (this.props.status) {
      case 'success':
        ret = '#13ce66';
        break;
      case 'exception':
        ret = '#ff4949';
        break;
      default:
        ret = '#20a0ff';
    }
    return ret;
  }

  iconClass() {
    const { type, status } = this.props;
    return type === 'line'
      ? status === 'success' ? 'ishow-icon-circle-check' : 'ishow-icon-circle-cross'
      : status === 'success' ? 'ishow-icon-check' : 'ishow-icon-close';
  }

  progressTextSize() {
    const { type, strokeWidth, width } = this.props;
    return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2;
  }

  render(){
    const {
      type,
      percentage,
      status,
      strokeWidth,
      textInside,
      width,
      showText
    } = this.props;
    let progress;
    if (type === 'line') {
      progress = (
        <div className="ishow-progress-bar">
          <div
            className="ishow-progress-bar__outer"
            style={{ height: `${strokeWidth}px` }}
          >
            <div
              className="ishow-progress-bar__inner"
              style={{ width: `${percentage}%` }}
            >
              {showText &&
                textInside &&
                <div className="ishow-progress-bar__innerText">
                  {`${percentage}%`}
                </div>}
            </div>
          </div>
        </div>
      );
    } else {
      progress = (
        <div
          className="ishow-progress-circle"
          style={{ height: `${width}px`, width: `${width}px` }}
        >
          <svg viewBox="0 0 100 100">
            <path
              className="ishow-progress-circle__track"
              d={this.trackPath()}
              stroke="#e5e9f2"
              strokeWidth={this.relativeStrokeWidth()}
              fill="none"
            />
            <path
              className="ishow-progress-circle__path"
              d={this.trackPath()}
              strokeLinecap="round"
              stroke={this.stroke()}
              strokeWidth={this.relativeStrokeWidth()}
              fill="none"
              style={this.circlePathStyle()}
            />
          </svg>
        </div>
      );
    }
    const progressInfo = showText &&
      !textInside &&
      <div
        className="ishow-progress__text"
        style={{ fontSize: `${this.progressTextSize()}px` }}
      >
        {status ? <i className={this.iconClass()} /> : `${percentage}%`}
      </div>;

    return (
      <div
        style={this.style()}
        className={this.className('ishow-progress', `ishow-progress--${type}`, {
          [`is-${status}`]: !!status,
          'ishow-progress--without-text': !showText,
          'ishow-progress--text-inside': textInside
        })}
      >
        {progress}
        {progressInfo}
      </div>
    );
  }
}

Progress.propTypes = {
  type: PropTypes.oneOf(['line', 'circle']),
  percentage: PropTypes.number,
  status: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  textInside: PropTypes.bool,
  showText: PropTypes.bool
};
