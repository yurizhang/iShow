var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js'; //提供style, classname方法
import { EventRegister } from '../Common/internal';
import Input from '../Input/Input';
import { PLACEMENT_MAP, HAVE_TRIGGER_TYPES, TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';
import { Errors, require_condition, IDGenerator } from '../Common/utils';
import { MountBody } from './MountBody';

var idGen = new IDGenerator();
var haveTriggerType = function haveTriggerType(type) {
  return HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

var isValidValue = function isValidValue(value) {
  if (value instanceof Date) return true;
  if (Array.isArray(value) && value.length !== 0 && value[0] instanceof Date) return true;
  return false;
};

// only considers date-picker's value: Date or [Date, Date]
var valueEquals = function valueEquals(a, b) {
  var aIsArray = Array.isArray(a);
  var bIsArray = Array.isArray(b);

  var isEqual = function isEqual(a, b) {
    // equal if a, b date is equal or both is null or undefined
    var equal = false;
    if (a && b) equal = a.getTime() === b.getTime();else equal = a === b && a == null;
    return equal;
  };

  if (aIsArray && bIsArray) {
    return isEqual(a[0], b[0]) && isEqual(a[1], b[1]);
  }
  if (!aIsArray && !bIsArray) {
    return isEqual(a, b);
  }
  return false;
};

var BasePicker = function (_Component) {
  _inherits(BasePicker, _Component);

  _createClass(BasePicker, null, [{
    key: 'propTypes',

    //state: any;

    get: function get() {
      return {
        align: PropTypes.oneOf(['left', 'center', 'right']),
        format: PropTypes.string,
        isShowTrigger: PropTypes.bool,
        isReadOnly: PropTypes.bool,
        isDisabled: PropTypes.bool,
        placeholder: PropTypes.string,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        // (Date|Date[]|null)=>(), null when click on clear icon
        onChange: PropTypes.func,
        // time select pannel:
        value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.arrayOf(PropTypes.instanceOf(Date))])
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        value: new Date(),
        // (thisReactElement)=>Unit
        onFocus: function onFocus() {},
        onBlur: function onBlur() {}
      };
    }
  }]);

  function BasePicker(props, _type) {
    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BasePicker);

    require_condition(typeof _type === 'string');

    var _this = _possibleConstructorReturn(this, (BasePicker.__proto__ || Object.getPrototypeOf(BasePicker)).call(this, props));

    _this.type = _type; // type need to be set first
    _this.state = Object.assign({}, state, {
      pickerVisible: false
    }, _this.propsToState(props));

    _this.clickOutsideId = 'clickOutsideId_' + idGen.next();
    return _this;
  }

  // ---: start, abstract methods
  // (state, props)=>ReactElement


  _createClass(BasePicker, [{
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      throw new Errors.MethodImplementationRequiredError(props);
    }
  }, {
    key: 'getFormatSeparator',
    value: function getFormatSeparator() {
      return undefined;
    }
    // ---: end, abstract methods

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.propsToState(nextProps));
    }

    /**
     * onPicked should only be called from picker pannel instance
     * and should never return a null date instance
     *
     * @param value: Date|Date[]|null
     * @param isKeepPannel: boolean = false
     */

  }, {
    key: 'onPicked',
    value: function onPicked(value) {
      var isKeepPannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //only change input value on picked triggered
      var hasChanged = !valueEquals(this.state.value, value);
      this.setState({
        pickerVisible: isKeepPannel,
        value: value,
        text: this.dateToStr(value)
      });

      if (hasChanged) {
        this.props.onChange(value);
        this.context.form && this.context.form.onFieldChange();
      }
    }
  }, {
    key: 'dateToStr',
    value: function dateToStr(date) {
      if (!isValidValue(date)) return '';

      var tdate = date;
      var formatter = (TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP['default']).formatter;
      var result = formatter(tdate, this.getFormat(), this.getFormatSeparator());

      return result;
    }

    // (string) => Date | null

  }, {
    key: 'parseDate',
    value: function parseDate(dateStr) {
      if (!dateStr) return null;
      var type = this.type;
      var parser = (TYPE_VALUE_RESOLVER_MAP[type] || TYPE_VALUE_RESOLVER_MAP['default']).parser;
      return parser(dateStr, this.getFormat(), this.getFormatSeparator());
    }
  }, {
    key: 'getFormat',
    value: function getFormat() {
      return this.props.format || DEFAULT_FORMATS[this.type];
    }
  }, {
    key: 'propsToState',
    value: function propsToState(props) {
      var state = {};
      if (this.isDateValid(props.value)) {
        state.text = this.dateToStr(props.value);
        state.value = props.value;
      } else {
        state.text = '';
        state.value = null;
      }

      // if (state.value == null) {
      //   state.value = new Date()
      // }

      return state;
    }
  }, {
    key: 'triggerClass',
    value: function triggerClass() {
      return this.type.includes('time') ? 'ishow-icon-time' : 'ishow-icon-date';
    }
  }, {
    key: 'calcIsShowTrigger',
    value: function calcIsShowTrigger() {
      if (this.props.isShowTrigger != null) {
        return !!this.props.isShowTrigger;
      } else {
        return haveTriggerType(this.type);
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var _this2 = this;

      this.isInputFocus = true;
      if (haveTriggerType(this.type) && !this.state.pickerVisible) {
        this.setState({ pickerVisible: true }, function () {
          _this2.props.onFocus(_this2);
        });
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur() {
      this.isInputFocus = false;
      this.props.onBlur(this);
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(evt) {
      var keyCode = evt.keyCode;
      // tab
      if (keyCode === 9 || keyCode === 27) {
        this.setState({ pickerVisible: false });
        evt.stopPropagation();
      }
    }
  }, {
    key: 'togglePickerVisible',
    value: function togglePickerVisible() {
      this.setState({
        pickerVisible: !this.state.pickerVisible
      });
    }
  }, {
    key: 'isDateValid',
    value: function isDateValid(date) {
      return date == null || isValidValue(date);
    }

    // return true on condition
    //  * input is parsable to date
    //  * also meet your other condition

  }, {
    key: 'isInputValid',
    value: function isInputValid(value) {
      var parseable = this.parseDate(value);
      if (!parseable) {
        return false;
      }

      var isdatevalid = this.isDateValid(parseable);
      if (!isdatevalid) {
        return false;
      }
      return true;
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(evt) {
      var _state = this.state,
          value = _state.value,
          pickerVisible = _state.pickerVisible;

      if (!this.isInputFocus && !pickerVisible) {
        return;
      }
      if (this.domRoot.contains(evt.target)) return;
      if (this.pickerProxy && this.pickerProxy.contains(evt)) return;
      if (this.isDateValid(value)) {
        this.setState({ pickerVisible: false });
        this.props.onChange(value);
        this.context.form && this.context.form.onFieldChange();
      } else {
        this.setState({ pickerVisible: false, text: this.dateToStr(value) });
      }
    }
  }, {
    key: 'handleClickIcon',
    value: function handleClickIcon() {
      var _props = this.props,
          isReadOnly = _props.isReadOnly,
          isDisabled = _props.isDisabled;
      var text = this.state.text;


      if (isReadOnly || isDisabled) return;
      if (!text) {
        this.togglePickerVisible();
      } else {
        this.setState({ text: '', value: null, pickerVisible: false });
        this.props.onChange(null);
        this.context.form && this.context.form.onFieldChange();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          isReadOnly = _props2.isReadOnly,
          placeholder = _props2.placeholder,
          isDisabled = _props2.isDisabled;
      var _state2 = this.state,
          pickerVisible = _state2.pickerVisible,
          value = _state2.value,
          text = _state2.text,
          isShowClose = _state2.isShowClose;


      var createIconSlot = function createIconSlot() {
        if (_this3.calcIsShowTrigger()) {
          var cls = isShowClose ? 'ishow-icon-close' : _this3.triggerClass();
          return React.createElement('i', {
            className: _this3.classNames('ishow-input__icon', cls),
            onClick: _this3.handleClickIcon.bind(_this3),
            onMouseEnter: function onMouseEnter() {
              if (isReadOnly || isDisabled) return;
              if (text) {
                _this3.setState({ isShowClose: true });
              }
            },
            onMouseLeave: function onMouseLeave() {
              _this3.setState({ isShowClose: false });
            }
          });
        } else {
          return null;
        }
      };

      var createPickerPanel = function createPickerPanel() {
        if (pickerVisible) {
          /* eslint-disable */
          var _props3 = _this3.props,
              _placeholder = _props3.placeholder,
              onFocus = _props3.onFocus,
              onBlur = _props3.onBlur,
              onChange = _props3.onChange,
              others = _objectWithoutProperties(_props3, ['placeholder', 'onFocus', 'onBlur', 'onChange']);
          /* eslint-enable */


          return React.createElement(
            MountBody,
            { ref: function ref(e) {
                return _this3.pickerProxy = e;
              } },
            _this3.pickerPanel(_this3.state, Object.assign({}, others, {
              getPopperRefElement: function getPopperRefElement() {
                return ReactDOM.findDOMNode(_this3.refs.inputRoot);
              },
              popperMixinOption: {
                placement: PLACEMENT_MAP[_this3.props.align] || PLACEMENT_MAP.left
              }
            }))
          );
        } else {
          return null;
        }
      };

      return React.createElement(
        'span',
        {
          className: this.classNames('ishow-date-editor', {
            'is-have-trigger': this.calcIsShowTrigger(),
            'is-active': pickerVisible,
            'is-filled': !!value
          }),

          ref: function ref(v) {
            return _this3.domRoot = v;
          }
        },
        React.createElement(EventRegister, {
          id: this.clickOutsideId,
          target: document,
          eventName: 'click',
          func: this.handleClickOutside.bind(this) }),
        React.createElement(Input, {
          className: this.classNames('ishow-date-editor ishow-date-editor--' + this.type),
          readOnly: isReadOnly,
          disabled: isDisabled,
          type: 'text',
          placeholder: placeholder,
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this),
          onKeyDown: this.handleKeydown.bind(this),
          onChange: function onChange(value) {
            var iptxt = value;
            var nstate = { text: iptxt };

            if (iptxt.trim() === '' || !_this3.isInputValid(iptxt)) {
              nstate.value = null;
            } else {
              //only set value on a valid date input
              nstate.value = _this3.parseDate(iptxt);
            }

            _this3.setState(nstate);
          },
          ref: 'inputRoot',
          value: text,
          icon: createIconSlot()
        }),
        createPickerPanel()
      );
    }
  }]);

  return BasePicker;
}(Component);

export default BasePicker;


BasePicker.contextTypes = {
  form: PropTypes.any
};