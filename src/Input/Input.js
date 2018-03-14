import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Input.css';

import calcTextareaHeight from './calcTextareaHeight'


export default class Input extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textareaStyle: { resize: props.resize }
        };
    }

    componentDidMount() {
        this.resizeTextarea();
    }

    /* <Instance Methods */

    focus(){
        setTimeout(() => {
            (this.refs.input || this.refs.textarea).focus();
        });
    }

    blur(){
        setTimeout(() => {
            (this.refs.input || this.refs.textarea).blur();
        });
    }

    /* Instance Methods> */

    fixControlledValue(value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    }

    handleChange(e) {
        const { onChange } = this.props;

        if (onChange) {
            onChange(e.target.value);
        }
        this.resizeTextarea();
    }

    handleFocus(e) {
        const { onFocus } = this.props;
        if (onFocus) onFocus(e)
    }

    handleBlur(e) {
        const { onBlur } = this.props;
        if (onBlur) onBlur(e)
    }

    handleIconClick() {
        if (this.props.onIconClick) {
            this.props.onIconClick()
        }
    }

    resizeTextarea() {
        const { autosize, type } = this.props;

        if (!autosize || type !== 'textarea') {
            return;
        }

        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;
        const textareaCalcStyle = calcTextareaHeight(this.refs.textarea, minRows, maxRows);

        this.setState({
            textareaStyle: Object.assign({}, this.state.textareaStyle, textareaCalcStyle)
        });
    }

    render() {
    const { type, size, prepend, append, icon, autoComplete, validating, rows, onMouseEnter, onMouseLeave,
            ...otherProps
        } = this.props;

        const classname = this.classNames(
            type === 'textarea' ? 'ishow-textarea' : 'ishow-input',
            size && `ishow-input--${size}`, {
                'is-disabled': this.props.disabled,
                'ishow-input-group': prepend || append,
                'ishow-input-group--append': !!append,
                'ishow-input-group--prepend': !!prepend
            }
        );

        if ('value' in this.props) {
            otherProps.value = this.fixControlledValue(this.props.value);

            delete otherProps.defaultValue;
        }

        delete otherProps.resize;
        delete otherProps.style;
        delete otherProps.autosize;
        delete otherProps.onIconClick;

        if (type === 'textarea') {
      return (
        <div style={this.style()} className={this.className(classname)}>
          <textarea { ...otherProps }
            ref="textarea"
            className="ishow-textarea__inner"
            style={this.state.textareaStyle}
            rows={rows}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
          ></textarea>
        </div>
            )
        } else {
      return (
        <div style={this.style()} className={this.className(classname)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          { prepend && <div className="ishow-input-group__prepend">{prepend}</div> }
          { typeof icon === 'string' ? <i className={`ishow-input__icon ishow-icon-${icon}`} onClick={this.handleIconClick.bind(this)}>{prepend}</i> : icon }
          <input { ...otherProps }
                    ref = "input"
                    type = { type }
                    className = "ishow-input__inner"
                    autoComplete = { autoComplete }
                    onChange = { this.handleChange.bind(this) }
                    onFocus = { this.handleFocus.bind(this) }
                    onBlur = { this.handleBlur.bind(this) }
          />
          { validating && <i className="ishow-input__icon ishow-icon-loading"></i> }
          { append && <div className="ishow-input-group__append">{append}</div> }
        </div>
                )
            }
        }
    }
Input.defaultProps = {
  type: 'text',
  autosize: false,
  rows: 2,
  autoComplete: 'off'
}

    Input.propTypes = {
        // base
        type: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        disabled: PropTypes.bool,
        name: PropTypes.string,
        placeholder: PropTypes.string,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        defaultValue: PropTypes.any,
        value: PropTypes.any,

        // type !== 'textarea'
        size: PropTypes.oneOf(['large', 'small', 'mini']),
        prepend: PropTypes.node,
        append: PropTypes.node,

        // type === 'textarea'
        autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        rows: PropTypes.number,
        resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),

        // event
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onIconClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,

        // autoComplete
        autoComplete: PropTypes.string,
        inputSelect: PropTypes.func,

        // form related
        form: PropTypes.string,
        validating: PropTypes.bool,
    }