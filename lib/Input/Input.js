'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

require('../Common/css/Input.css');

var _calcTextareaHeight = require('./calcTextareaHeight');

var _calcTextareaHeight2 = _interopRequireDefault(_calcTextareaHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


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
            var textareaCalcStyle = (0, _calcTextareaHeight2.default)(this.refs.textarea, minRows, maxRows);

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
                return _react2.default.createElement(
                    'div',
                    { style: this.style(), className: this.className(classname) },
                    _react2.default.createElement('textarea', _extends({}, otherProps, {
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
                return _react2.default.createElement(
                    'div',
                    { style: this.style(), className: this.className(classname), onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
                    prepend && _react2.default.createElement(
                        'div',
                        { className: 'ishow-input-group__prepend' },
                        prepend
                    ),
                    typeof icon === 'string' ? _react2.default.createElement(
                        'i',
                        { className: 'ishow-input__icon ishow-icon-' + icon, onClick: this.handleIconClick.bind(this) },
                        prepend
                    ) : icon,
                    _react2.default.createElement('input', _extends({}, otherProps, {
                        ref: 'input',
                        type: type,
                        className: 'ishow-input__inner',
                        autoComplete: autoComplete,
                        onChange: this.handleChange.bind(this),
                        onFocus: this.handleFocus.bind(this),
                        onBlur: this.handleBlur.bind(this)
                    })),
                    validating && _react2.default.createElement('i', { className: 'ishow-input__icon ishow-icon-loading' }),
                    append && _react2.default.createElement(
                        'div',
                        { className: 'ishow-input-group__append' },
                        append
                    )
                );
            }
        }
    }]);

    return Input;
}(_index2.default);

exports.default = Input;

Input.defaultProps = {
    type: 'text',
    autosize: false,
    rows: 2,
    autoComplete: 'off'
};

Input.propTypes = {
    // base
    type: _propTypes2.default.string,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
    disabled: _propTypes2.default.bool,
    name: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    readOnly: _propTypes2.default.bool,
    autoFocus: _propTypes2.default.bool,
    maxLength: _propTypes2.default.number,
    minLength: _propTypes2.default.number,
    defaultValue: _propTypes2.default.any,
    value: _propTypes2.default.any,

    // type !== 'textarea'
    size: _propTypes2.default.oneOf(['large', 'small', 'mini']),
    prepend: _propTypes2.default.node,
    append: _propTypes2.default.node,

    // type === 'textarea'
    autosize: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
    rows: _propTypes2.default.number,
    resize: _propTypes2.default.oneOf(['none', 'both', 'horizontal', 'vertical']),

    // event
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onIconClick: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,

    // autoComplete
    autoComplete: _propTypes2.default.string,
    inputSelect: _propTypes2.default.func,

    // form related
    form: _propTypes2.default.string,
    validating: _propTypes2.default.bool
};