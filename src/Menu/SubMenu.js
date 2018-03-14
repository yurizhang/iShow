/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import CollapseTransition from '../Collapse/CollapseTransition';
import MixinComponent from './MixinComponent';

export default class SubMenu extends MixinComponent {


  constructor(props) {
    super(props);

    this.instanceType = 'SubMenu';

    this.state = {
      active: false
    };
  }

  getChildContext(){
    return {
      component: this
    };
  }

  componentDidMount() {
    this.rootMenu().state.submenus[this.props.index] = this;
    this.initEvents();
  }

  onItemSelect(index, indexPath) {
    this.setState({
      active: indexPath.indexOf(this.props.index) !== -1
    });
  }

  handleClick() {
    this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
  }

  handleMouseenter() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.rootMenu().openMenu(this.props.index, this.indexPath());
    }, 300);
  }

  handleMouseleave() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.rootMenu().closeMenu(this.props.index, this.indexPath());
    }, 300);
  }

  initEvents() {
    if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
      const triggerElm = ReactDOM.findDOMNode(this);

      triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
      triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
    } else {
      const triggerElm = this.refs['submenu-title'];

      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  opened() {
    return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
  }

  render() {
    return (
      <li style={this.style()} className={this.className('ishow-submenu', {
        'is-active': this.state.active,
        'is-opened': this.opened()
      })}>
        <div ref="submenu-title" className="ishow-submenu__title">
          {this.props.title}
          <i className={this.classNames('ishow-submenu__icon-arrow', {
              'ishow-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
              'ishow-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
            })}>
          </i>
        </div>
        {
          this.rootMenu().props.mode === 'horizontal' ? (
            <Transition name="ishow-zoom-in-top">
              <View show={this.opened()}>
                <ul className="ishow-menu">{this.props.children}</ul>
              </View>
            </Transition>
          ) : (
            <CollapseTransition isShow={this.opened()}>
              <ul className="ishow-menu">{this.props.children}</ul>
            </CollapseTransition>
          )
        }

      </li>
    )
  }
}

SubMenu.childContextTypes = {
  component: PropTypes.any
};

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
};
