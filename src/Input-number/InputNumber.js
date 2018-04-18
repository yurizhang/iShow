/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js';
import '../Common/css/Input-number.css';
import Input from '../Input';
import { accAdd, accSub } from './util';

export default class InputNumber extends Component {
  state;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      inputActive: false
    };
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.props.value) {
      this.setState({ value: props.value });
    }
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      case 38: // KeyUp
        e.preventDefault();
        this.increase();
        break;
      case 40: // KeyDown
        e.preventDefault();
        this.decrease();
        break;
      default:
        break;
    }
  }

  onBlur() {
    let value = this.state.value;

    if (this.isValid) {
      value = Number(value);

      if (value > this.props.max) {
        value = Number(this.props.max);
      } else if (value < this.props.min) {
        value = Number(this.props.min);
      }
    } else {
      value = undefined;
    }

    this.setState({ value }, this.onChange);
  }

  onInput(value) {
    this.setState({ value }, () => {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.onBlur();
      }, 750);
    });
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  get isValid() {
    return this.state.value !== '' && !isNaN(Number(this.state.value));
  }

  get minDisabled() {
    return  !this.isValid || (this.state.value - Number(this.props.step) < this.props.min);
  }

  get maxDisabled() {
    return  !this.isValid || (this.state.value + Number(this.props.step) > this.props.max);
  }

  increase() {
    const { step, max, disabled, min} = this.props;
    let { value, inputActive } = this.state;

    if (this.maxDisabled) {
      inputActive = false;
    } else {
      if (value + Number(step) > max || disabled) return;
      if (value + Number(step) < min ) value = min - Number(step);

      value = accAdd(step, value);
    }

    this.setState({ value, inputActive }, this.onChange);
  }

  decrease() {
    const { step, min, disabled, max } = this.props;
    let { value, inputActive } = this.state;

    if (this.minDisabled) {
      inputActive = false;
    } else {
      if (value - Number(step) < min || disabled) return;
      if (value - Number(step) > max) value = Number(max) + Number(step);
      value = accSub(value, step);
    }

    this.setState({ value, inputActive }, this.onChange);
  }

  activeInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: true
      })
    }
  }

  inactiveInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: false
      })
    }
  }

  render() {
    const { controls, disabled, size } = this.props;
    const { value, inputActive } = this.state;

    return (
      <div style={this.style()} className={this.className('el-input-number', size && `el-input-number--${size}`, {
        'is-disabled': disabled,
        'is-without-controls': !controls
      })}>
        {
          controls && (
            <span
              className={this.classNames("el-input-number__decrease", {
                'is-disabled': this.minDisabled
              })}
              onClick={this.decrease.bind(this)}
            >
              <i className="el-icon-minus"></i>
            </span>
          )
        }
        {
          controls && (
            <span
              className={this.classNames("el-input-number__increase", {
                'is-disabled': this.maxDisabled
              })}
              onClick={this.increase.bind(this)}
            >
              <i className="el-icon-plus"></i>
            </span>
          )
        }
        <Input
          ref="input"
          className={this.classNames({
            'is-active': inputActive
          })}
          value={value}
          disabled={disabled}
          size={size}
          onChange={this.onInput.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={this.onBlur.bind(this)} />
      </div>
    )
  }
}

InputNumber.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  controls: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func
}

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
}
