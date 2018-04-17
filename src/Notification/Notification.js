import React from 'react';
import PropTypes from 'prop-types';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import '../Common/css/Notification.css';
import '../Common/css/Icon.css';
const typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};


export default class Notification extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.setState({ visible: true });
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    });
  }

  startTimer() {
    if (this.props.duration) {
      this.timeout = setTimeout(() => {
        this.onClose();
      }, this.props.duration)
    }
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  typeClass() {
    return this.props.type && typeMap[this.props.type] ? `ishow-icon-${ typeMap[this.props.type] }` : '';
  }

  render() {
    return (
      <Transition
        name="ishow-notification-fade"
        onAfterEnter={() => { this.offsetHeight = this.rootDOM.offsetHeight;}}
        onLeave={() => { this.props.onClose && this.props.onClose() }}
        onAfterLeave={() => { this.props.willUnmount(this.offsetHeight, parseInt(this.rootDOM.style.top,10)) }}
      >
        <View show={this.state.visible}>
          <div
            ref={(ele) => { this.rootDOM = ele; }}
            className="ishow-notification"
            style={{
                top: this.props.top,
                zIndex: 9999
            }}
            onMouseEnter={this.stopTimer.bind(this)}
            onMouseLeave={this.startTimer.bind(this)}
            onClick={this.onClick.bind(this)}
          >
          {this.props.iconClass ? <i className={this.classNames('ishow-notification__icon', this.props.iconClass)} />
          : this.props.type?<i className={this.classNames('ishow-notification__icon', this.typeClass())} />:''}
            {/* {
            this.props.type && <i className={this.classNames('ishow-notification__icon', this.typeClass(), this.props.iconClass)} />
            } */}

            <div className={this.classNames('ishow-notification__group', {
              'is-with-icon': this.typeClass() || this.props.iconClass
            })}>
              <h2 className="ishow-notification__title">{this.props.title}</h2>
              <div className="ishow-notification__content">{this.props.message}</div>
              <div className="ishow-notification__closeBtn ishow-icon-close" onClick={this.onClose.bind(this)}></div>
            </div>
          </div>
        </View>
      </Transition>
    )
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  top: PropTypes.number
}

Notification.defaultProps = {
  duration: 4500,
  top: 16
}
