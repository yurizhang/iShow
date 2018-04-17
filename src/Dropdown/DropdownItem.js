import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Dropdown.css'
export default class DropdownItem extends Component {
  handleClick() {
    this.context.component.handleMenuItemClick(this.props.command, this);
  }

  render() {
    const { disabled, divided } = this.props;

    return (
      <li
        style={this.style()}
        className={this.className('ishow-dropdown-menu__item', {
          'is-disabled': disabled,
          'ishow-dropdown-menu__item--divided': divided
        })} onClick={this.handleClick.bind(this)}
      >
        { this.props.children }
      </li>
    )
  }
}

DropdownItem.contextTypes = {
  component: PropTypes.any
};

DropdownItem.propTypes = {
  command: PropTypes.string,
  disabled: PropTypes.bool,
  divided: PropTypes.bool,
};
