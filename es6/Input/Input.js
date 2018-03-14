var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/Input.css';

import calcTextareaHeight from './calcTextareaHeight';

var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.state = {
            textareaStyle: { resize: props.resize }
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.resizeTextarea();
        }

        /* <Instance Methods */

    }, {
        key: 'focus',
        value: function focus() {
            var _this2 = this;

            setTimeout(function () {
                (_this2.refs.input || _this2.refs.textarea).focus();
            });
        }
    }, {
        key: 'blur',
        value: function blur() {
            var _this3 = this;

            setTimeout(function () {
                (_this3.refs.input || _this3.refs.textarea).blur();
            });
        }

        /* Instance Methods> */

    }, {
        key: 'fixControlledValue',
        value: function fixControlledValue(value) {
            if (typeof value === 'undefined' || value === null) {
                return '';
            }
            return value;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var onChange = this.props.onChange;


            if (onChange) {
                onChange(e.target.value);
            }
            this.resizeTextarea();
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(e) {
            var onFocus = this.props.onFocus;

            if (onFocus) onFocus(e);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var onBlur = this.props.onBlur;

            if (onBlur) onBlur(e);
        }
    }, {
        key: 'handleIconClick',
        value: function handleIconClick() {
            if (this.props.onIconClick) {
                this.props.onIconClick();
            }
        }
    }, {
        key: 'resizeTextarea',
        value: function resizeTextarea() {
            var _props = this.props,
                autosize = _props.autosize,
                type = _props.type;


            if (!autosize || type !== 'textarea') {
                return;
            }

            var minRows = autosize.minRows;
            var maxRows = autosize.maxRows;
            var textareaCalcStyle = calcTextareaHeight(this.refs.textarea, minRows, maxRows);

            this.setState({
                textareaStyle: Object.assign({}, this.state.textareaStyle, textareaCalcStyle)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                type = _props2.type,
                size = _props2.size,
                prepend = _props2.prepend,
                append = _props2.append,
                icon = _props2.icon,
                autoComplete = _props2.autoComplete,
                validating = _props2.validating,
                rows = _props2.rows,
                onMouseEnter = _props2.onMouseEnter,
                onMouseLeave = _props2.onMouseLeave,
                otherProps = _objectWithoutProperties(_props2, ['type', 'size', 'prepend', 'append', 'icon', 'autoComplete', 'validating', 'rows', 'onMouseEnter', 'onMouseLeave']);

            var classname = this.classNames(type === 'textarea' ? 'ishow-textarea' : 'ishow-input', size && 'ishow-input--' + size, {
                'is-disabled': this.props.disabled,
                'ishow-input-group': prepend || append,
                'ishow-input-group--append': !!append,
                'ishow-input-group--prepend': !!prepend
            });

            if ('value' in this.props) {
                otherProps.value = this.fixControlledValue(this.props.value);

                delete otherProps.defaultValue;
            }

            delete otherProps.resize;
            delete otherProps.style;
            delete otherProps.autosize;
            delete otherProps.onIconClick;

            if (type === 'textarea') {
                return React.createElement(
                    'div',
                    { style: this.style(), className: this.className(classname) },
                    React.createElement('textarea', Object.assign({}, otherProps, {
                        ref: 'textarea',
                        className: 'ishow-textarea__inner',
                        style: this.state.textareaStyle,
                        rows: rows,
                        onChange: this.handleChange.bind(this),
                        onFocus: this.handleFocus.bind(this),
                        onBlur: this.handleBlur.bind(this)
                    }))
                );
            } else {
                return React.createElement(
                    'div',
                    { style: this.style(), className: this.className(classname), onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                    prepend && React.createElement(
                        'div',
                        { className: 'ishow-input-group__prepend' },
                        prepend
                    ),
                    typeof icon === 'string' ? React.createElement(
                        'i',
                        { className: 'ishow-input__icon ishow-icon-' + icon, onClick: this.handleIconClick.bind(this) },
                        prepend
                    ) : icon,
                    React.createElement('input', Object.assign({}, otherProps, {
                        ref: 'input',
                        type: type,
                        className: 'ishow-input__inner',
                        autoComplete: autoComplete,
                        onChange: this.handleChange.bind(this),
                        onFocus: this.handleFocus.bind(this),
                        onBlur: this.handleBlur.bind(this)
                    })),
                    validating && React.createElement('i', { className: 'ishow-input__icon ishow-icon-loading' }),
                    append && React.createElement(
                        'div',
                        { className: 'ishow-input-group__append' },
                        append
                    )
                );
            }
        }
    }]);

    return Input;
}(Component);

export default Input;

Input.defaultProps = {
    type: 'text',
    autosize: false,
    rows: 2,
    autoComplete: 'off'
};

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
    validating: PropTypes.bool
};