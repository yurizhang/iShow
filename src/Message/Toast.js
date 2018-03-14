import React from 'react';
import PropTypes from 'prop-types';
import {default as Component, View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from './transition';
import icons from './assets';


export default class Toast extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })

    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    });
  }

  startTimer() {
		if (this.props.duration > 0) {
			this.timeout = setTimeout(() => {
				this.onClose();
			}, this.props.duration)
		}
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }

  render() {
    const { iconClass, customClass } = this.props;

    return (
      <Transition name="ishow-message-fade" onAfterLeave={() => { this.props.willUnmount(); }}>
        <View show={this.state.visible}>
          <div className={this.classNames('ishow-message', customClass)} onMouseEnter={this.stopTimer.bind(this)} onMouseLeave={this.startTimer.bind(this)}>
            { !iconClass && <img className="ishow-message__img" src={icons[this.props.type]} alt={icons[this.props.type]}/> }
            <div className={this.classNames('ishow-message__group', { 'is-with-icon': iconClass })}>
              { iconClass && <i className={this.classNames('ishow-message__icon', iconClass)}></i> }
              <p>{this.props.message}</p>
              { this.props.showClose && <div className="ishow-message__closeBtn ishow-icon-close" onClick={this.onClose.bind(this)}></div> }
            </div>
          </div>
        </View>
      </Transition>
    )
  }
}

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  customClass: PropTypes.string,
  iconClass: PropTypes.string
}

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
}
