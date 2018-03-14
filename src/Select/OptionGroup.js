import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法

export default class OptionGroup extends Component {
  render() {
    return (
      <ul style={this.style()} className={this.className('ishow-select-group__wrap')}>
        <li className="ishow-select-group__title">{this.props.label}</li>
        <li>
          <ul className="ishow-select-group">
            {this.props.children}
          </ul>
        </li>
      </ul>
    )
  }
}

OptionGroup.propTypes = {
  label: PropTypes.string,
};
