/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Loading.css';
export default class Loading extends Component {
  componentWillUnmount() {
    this.enableScroll();
  }

  getStyle(){
    if (this.props.fullscreen) {
      this.disableScroll();

      return {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999
      }
    } else {
      this.enableScroll();

      return {
        position: 'relative'
      }
    }
  }

  documentBody() {
    return document.body;
  }

  disableScroll() {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.setProperty('overflow', 'hidden');
    }
  }

  enableScroll() {
    const documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.removeProperty('overflow');
    }
  }

  render() {
    const { loading, fullscreen, text } = this.props;

    return (
      <div style={this.style(this.getStyle())} className={this.className()}>
        { loading && (
          <div
            style={{
              display: 'block',
              position: 'absolute',
              zIndex: 657,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}>
            <div className={this.classNames('ishow-loading-spinner', {
              'is-full-screen': fullscreen
            })} style={{
              position: 'absolute',
              display: 'inline-block',
              left: 0
            }}>
              <svg className="circular" viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" />
              </svg>
              {
                text && <p className="ishow-loading-text">{text}</p>
              }
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    )
  }
}

Loading.propTypes = {
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  text: PropTypes.string
};

Loading.defaultProps = {
  loading: true
};
