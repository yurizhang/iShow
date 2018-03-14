import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/radio.css';

export default class Radio extends Component {
  static elementType = 'Radio';

  constructor(props) {
    super(props);

    this.state = {
      checked: this.getChecked(props)
    };
  }

  componentWillReceiveProps(props) {
    const checked = this.getChecked(props);

    if (this.state.checked !== checked) {
      this.setState({ checked });
    }
  }

  onChange(e) {
    const checked = e.target.checked;

    if (checked) {
      if (this.props.onChange) {
        this.props.onChange(this.props.value);
      }
    }

    this.setState({ checked });
  }

  onFocus() {
    this.setState({
      focus: true
    })
  }

  onBlur() {
    this.setState({
      focus: false
    })
  }

  getChecked(props) {
    return props.model === props.value || Boolean(props.checked)
  }

  render(){
    const { checked, focus } = this.state;
    const { disabled, value, children } = this.props;

    return (
      <label style={this.style()} className={this.className('ishow-radio')}>
        <span className={this.classNames({
          'ishow-radio__input': true,
          'is-checked': checked,
          'is-disabled': disabled,
          'is-focus': focus
        })}>
          <span className="ishow-radio__inner"></span>
          <input
            type="radio"
            className="ishow-radio__original"
            checked={checked}
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
        </span>
        <span className="ishow-radio__label">
          {children || value}
        </span>
      </label>
    )
  }
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
}
