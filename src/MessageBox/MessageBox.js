/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Button from '../Button/Button';
import Input from '../Input/Input';
import '../Common/css/MessageBox.css';
import '../Common/css/Base.css';
const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};


export default class MessageBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      inputValue: props.inputValue
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })
  }

  confirmButtonText() {
    return this.props.confirmButtonText;
  }

  cancelButtonText() {
    return this.props.cancelButtonText;
  }

  onChange(value) {
    this.setState({
      inputValue: value
    });
    this.validate(value);
  }

  typeClass() {
    return this.props.type && typeMap[this.props.type] && `ishow-icon-${ typeMap[this.props.type] }`;
  }

  validate(value) {
    const { inputPattern, inputValidator, inputErrorMessage } = this.props;
    let editorErrorMessage;

    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage;
    }

    if (typeof inputValidator === 'function') {
      const validateResult = inputValidator(value);

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage;
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult;
      }
    }

    this.setState({ editorErrorMessage });

    return !editorErrorMessage;
  }

  handleAction(action) {
    const { modal, promise, showInput } = this.props;

    if (modal) {
      switch (action) {
        case 'cancel':
          promise.reject();
          break;
        case 'confirm':
          if (modal === 'prompt') {
            if (this.validate(this.state.inputValue || '')) {
              if (showInput) {
                promise.resolve({ value: this.state.inputValue, action });
              } else {
                promise.resolve(action);
              }
            } else {
              return;
            }
          } else {
            promise.resolve();
          }
          break;
        default:
          break;
      }
    } else {
      promise.resolve(action);
    }

    this.close();
  }

  close() {
    this.setState({
      visible: false
    });
  }

  render(){
    const { willUnmount, title, showClose, message, showInput, inputPlaceholder, showCancelButton, cancelButtonClass, showConfirmButton, confirmButtonClass, inputType } = this.props;
    const { visible, editorErrorMessage } = this.state;

    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition name="msgbox-fade" onAfterLeave={() => { willUnmount && willUnmount() }}>
            <View show={visible}>
              <div className="ishow-message-box__wrapper">
                <div className="ishow-message-box">
                  {
                    title && (
                      <div className="ishow-message-box__header">
                        <div className="ishow-message-box__title">{title}</div>
                        {
                          showClose && (
                            <button type="button" className="ishow-message-box__headerbtn" aria-label="Close" onClick={this.handleAction.bind(this, 'cancel')}>
                              <i className="ishow-message-box__close ishow-icon-close" />
                            </button>
                          )
                        }
                      </div>
                    )
                  }
                  {
                    message && (
                      <div className="ishow-message-box__content">
                        <div className={this.classNames('ishow-message-box__status', this.typeClass())}></div>
                        <div className="ishow-message-box__message" style={{ marginLeft: this.typeClass() ? '50px' : '0' }}>
                          <p>{message}</p>
                        </div>
                        <View show={showInput}>
                          <div className="ishow-message-box__input">
                            <Input
                              className={this.classNames({
                                'invalid': editorErrorMessage
                              })}
                              type={inputType}
                              value={this.state.inputValue}
                              placeholder={inputPlaceholder}
                              onChange={this.onChange.bind(this)}
                            />
                            <div className="ishow-message-box__errormsg" style={{
                              visibility: editorErrorMessage ? 'visible' : 'hidden'
                            }}>{editorErrorMessage}</div>
                          </div>
                        </View>
                      </div>
                    )
                  }
                  <div className="ishow-message-box__btns">
                    <View show={showCancelButton}>
                      <Button className={cancelButtonClass} onClick={this.handleAction.bind(this, 'cancel')}>{this.cancelButtonText()}</Button>
                    </View>
                    <View show={showConfirmButton}>
                      <Button className={this.classNames('ishow-button--primary', confirmButtonClass)} onClick={this.handleAction.bind(this, 'confirm')}>{this.confirmButtonText()}</Button>
                    </View>
                  </div>
                </div>
              </div>
            </View>
          </Transition>
        </div>
        <Transition name="v-modal">
          <View show={visible}>
            <div className="v-modal" style={{ zIndex: 1006 }}></div>
          </View>
        </Transition>
      </div>
    )
  }
}

MessageBox.propTypes = {
  modal: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.regex,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  inputValue: PropTypes.any,
  inputType: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
}

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true,
  confirmButtonText:'确认',
  cancelButtonText:'取消'
}
