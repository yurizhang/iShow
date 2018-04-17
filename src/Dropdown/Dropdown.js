import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法

import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import '../Common/css/Dropdown.css'
Button.Group = ButtonGroup;
class Dropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    }
  }

  getChildContext() {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.initEvent();
  }

  componentWillUpdate(props, state) {
    if (state.visible !== this.state.visible) {
      this.refs.dropdown.onVisibleChange(state.visible);

      if (this.props.onVisibleChange) {
        this.props.onVisibleChange(state.visible);
      }
    }
  }

  handleClickOutside() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }

  show() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ visible: true }), 250);
  }

  hide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ visible: false }), 150);
  }

  handleClick() {
    this.setState({ visible: !this.state.visible });
  }

  initEvent() {
    const { trigger, splitButton } = this.props;
    const triggerElm = ReactDOM.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

    if (trigger === 'hover') {
      triggerElm.addEventListener('mouseenter', this.show.bind(this));
      triggerElm.addEventListener('mouseleave', this.hide.bind(this));

      let dropdownElm = ReactDOM.findDOMNode(this.refs.dropdown);

      dropdownElm.addEventListener('mouseenter', this.show.bind(this));
      dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
    } else if (trigger === 'click') {
      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  }

  handleMenuItemClick(command, instance) {
    if (this.props.hideOnClick) {
      this.setState({
        visible: false
      });
    }

    if (this.props.onCommand) {
      setTimeout(() => {
        this.props.onCommand(command, instance);
      });
    }
  }

  render(){
    const { splitButton, type, size, menu } = this.props;

    return (
      <div style={this.style()} className={this.className('ishow-dropdown')}>
        {
          splitButton ?  (
            <Button.Group>
              <Button type={type} size={size} onClick={this.props.onClick.bind(this)}>
                {this.props.children}
              </Button>
              <Button ref="trigger" type={type} size={size} className="ishow-dropdown__caret-button">
                <i className="ishow-dropdown__icon ishow-icon-caret-bottom"></i>
              </Button>
            </Button.Group>
          ) : React.cloneElement(this.props.children, { ref: 'default' })
        }
        {
          React.cloneElement(menu, {
            ref: 'dropdown'
          })
        }
      </div>
    )
  }
}

Dropdown.childContextTypes = {
  component: PropTypes.any
};

Dropdown.propTypes = {
  menu: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  splitButton: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  onCommand: PropTypes.func,
  onVisibleChange: PropTypes.func
}

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
}

export default ClickOutside(Dropdown);
