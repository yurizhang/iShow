import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js';
import '../Common/css/Icon.css';

export default class Icon extends Component {
  render() {
    return <i style={this.style()} className={this.className(`ishow-icon-${this.props.name}`)}></i>;
  }
}

Icon.propTypes = {
  name: PropTypes.string
}
