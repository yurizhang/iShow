import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Collapse-item.css';
import CollapseTransition from './CollapseTransition'

export default class CollapseItem extends Component {

  render() {
    const { title, isActive, onClick, name } = this.props;

    return (
      <div
        className={this.classNames({
          'ishow-collapse-item': true,
          'is-active': isActive
        })}
      >
        <div className="ishow-collapse-item__header" onClick={() => onClick(name)}>
          <i className="ishow-collapse-item__header__arrow ishow-icon-arrow-right" />
          {title}
        </div>
        <CollapseTransition isShow={isActive}>
          <div className="ishow-collapse-item__wrap">
            <div className="ishow-collapse-item__content">
              {this.props.children}
            </div>
          </div>
        </CollapseTransition>
      </div>
    );
  }
}

CollapseItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.node,
  name: PropTypes.string
};
