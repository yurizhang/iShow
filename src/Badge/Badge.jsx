import React from 'react';
import { default as Component } from '../Common/plugs/index.js';
import PropTypes from 'prop-types';
import '../Common/css/Badge.css'

export default class Badge extends Component {

  render() {
    const { children, value, max, isDot } = this.props;
    const className = this.classNames({
      'ishow-badge__content': true,
      'is-fixed': !!children,
      'is-dot': !!isDot,
    });
    let content;

    if (isDot) {
      content = null;
    } else {
      if (typeof value === 'number' && typeof max === 'number') {
        content = max < value ? `${max}+` : value;
      } else {
        content = value;
      }
    }

    return (
      <div style={this.style()} className={this.className('ishow-badge')}>
        { children }
        <sup className={ className }>{ content }</sup>
      </div>
    )
  }
}

Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.number,
  isDot: PropTypes.bool,
}

Badge.defaultProps = {
  isDot: false,
}
