import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../Common/popper';
import Transition from '../Message/transition';
import PropTypes from 'prop-types';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Dropdown.css'
export default class DropdownMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopper: false
    }
  }

  onVisibleChange(visible) {
    this.setState({
      showPopper: visible
    })
  }

  onEnter() {
    const parent = ReactDOM.findDOMNode(this.parent());

    this.popperJS = new Popper(parent, this.refs.popper, {
      placement: this.placement(),
      gpuAcceleration: false
    });
  }

  onAfterLeave() {
    this.popperJS.destroy();
  }

  parent() {
    return this.context.component;
  }

  placement() {
    return `bottom-${this.parent().props.menuAlign}`;
  }

  render(){
    return (
      <Transition name="ishow-zoom-in-top" onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={this.state.showPopper}>
          <ul ref="popper" style={this.style()} className={this.className('ishow-dropdown-menu')}>
            {this.props.children}
          </ul>
        </View>
      </Transition>
    )
  }
}

DropdownMenu.contextTypes = {
  component: PropTypes.any
};
