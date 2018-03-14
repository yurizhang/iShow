/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component, View} from '../Common/plugs/index.js'; 
import Transition from '../Message/transition';
import '../Common/css/Tag.css';
export default class Tag extends Component {
  constructor(props){
    super(props);

    this.state = {
      visible: true
    };
  }

  handleClose() {
    this.setState({
      visible: false
    }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }

  render() {
    const { type, hit, closable, closeTransition, color } = this.props;

    return(
      <Transition name={closeTransition ? '' : 'ishow-zoom-in-center'}>
        <View key={this.state.visible} show={this.state.visible}>
          <span
            style={this.style({
              backgroundColor: color
            })}
            className={this.className('ishow-tag', type && `ishow-tag--${type}`, {
              'is-hit': hit
            })}
          >
            {this.props.children}
            { closable && <i className="ishow-tag__close ishow-icon-close" onClick={this.handleClose.bind(this)}></i> }
          </span>
        </View>
      </Transition>
    )
  }
}

Tag.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.string,
  hit: PropTypes.bool,
  color: PropTypes.string,
  closeTransition: PropTypes.bool,
  onClose: PropTypes.func
}
