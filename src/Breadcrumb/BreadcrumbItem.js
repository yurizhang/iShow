/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法

export default class BreadcrumbItem extends Component {
  render() {
    return (
      <span style={this.style()} className={this.className('ishow-breadcrumb__item')}>
        <span className="ishow-breadcrumb__item__inner" ref="link">{this.props.children}</span>
        <span className="ishow-breadcrumb__separator">{this.context.separator}</span>
      </span>
    )
  }
}

BreadcrumbItem.contextTypes = {
  separator: PropTypes.string
};
