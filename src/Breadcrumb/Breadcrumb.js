/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Breadcrumb.css';
export default class Breadcrumb extends Component {
  getChildContext() {
    return {
      separator: this.props.separator
    };
  }

  render() {
    return (
      <div style={this.style()} className={this.className('ishow-breadcrumb')}>
        {this.props.children}
      </div>
    )
  }
}

Breadcrumb.childContextTypes = {
  separator: PropTypes.string
};

Breadcrumb.propTypes = {
  separator: PropTypes.string
}

Breadcrumb.defaultProps = {
  separator: '/'
}
