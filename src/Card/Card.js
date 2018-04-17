import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Card.css';
export default class Card extends Component {
  render(){
    const { header, bodyStyle, children } = this.props;
    return (
      <div style={this.style()} className={this.className('ishow-card')}>
        {
          header && <div className="ishow-card__header">{ header }</div>
        }
        <div className="ishow-card__body" style={ bodyStyle }>
          { children }
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  header: PropTypes.node,
  bodyStyle: PropTypes.object
};

Card.defaultProps = {
  bodyStyle: {
      padding: '20px'
    }
}