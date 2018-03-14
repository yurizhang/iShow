import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import '../Common/css/radio-group.css';

export default class RadioGroup extends Component {
  getChildContext(){
    return {
      component: this
    };
  }

  onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <div ref="RadioGroup" style={this.style()} className={this.className('ishow-radio-group')}>
        {
          React.Children.map(this.props.children, element => {
            if (!element) {
              return null;
            }

            const { elementType } = element.type;
            if (elementType !== 'Radio' && elementType !== 'RadioButton') {
              return null;
            }

            return React.cloneElement(element, Object.assign({}, element.props, {
              onChange: this.onChange.bind(this),
              model: this.props.value,
              size: this.props.size
            }))
          })
        }
      </div>
    )
  }
}

RadioGroup.childContextTypes = {
  component: PropTypes.any
};

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
  textColor: PropTypes.string,
  fill: PropTypes.string,
  onChange: PropTypes.func
}
