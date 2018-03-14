import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Tabs.css';

export default class TabPane extends Component {

  render(){
    return (
      <div style={this.style()} className={this.className('ishow-tab-pane')}>
        { this.props.children }
      </div>
    );
  }
}

TabPane.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  closable: PropTypes.bool,
}

TabPane.defaultProps = {
  disabled: false,
  closable: false,
}
