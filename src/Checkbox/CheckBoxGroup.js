import React from 'react';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
export default class CheckboxGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: this.props.value || []
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.value !== this.props.value) {
      this.setState({
        options: nextProps.value
      });
    }
  }

  getChildContext(){
    return {
      ElCheckboxGroup: this
    };
  }

  onChange(value, checked) {
    const index = this.state.options.indexOf(value);

    if (checked) {
      if (index === -1) {
        this.state.options.push(value);
      }
    } else {
      this.state.options.splice(index, 1);
    }

    this.forceUpdate();

    if (this.props.onChange) {
      this.props.onChange(this.state.options);
    }
  }

  render(){
    const { options } = this.state;

    const children = React.Children.map(this.props.children, (child, index) => {
      if (!child) {
        return null;
      }

      const { elementType } = child.type;
      // 过滤非Checkbox和CheckboxButton的子组件
      if (elementType !== 'Checkbox' && elementType !== 'CheckboxButton') {
        return null;
      }

      return React.cloneElement(
        child,
        Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0 ,
          onChange: this.onChange.bind(this, child.props.value || child.props.label),
        }),
      );
    });

    return (
      <div style={this.style()} className={this.className('ishow-checkbox-group')}>
        {children}
      </div>
    )
  }
}

CheckboxGroup.childContextTypes = {
  ElCheckboxGroup: PropTypes.any
};

CheckboxGroup.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
