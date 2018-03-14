import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import rangeType from './range';
import regexType from './regex';

PropTypes.range = rangeType;
PropTypes.regex = regexType;
export default class Component extends React.Component {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }

  style(args) {
    return Object.assign({}, args, this.props.style)
  }
}

export class View extends Component {
  render() {
    const style = this.props.hasOwnProperty('show') && !this.props.show && {
      display: 'none'
    };

    if (React.Children.count(this.props.children) > 1) {
      return React.createElement(this.props.component, {
        style: Object.assign({}, this.props.style, style),
        className: this.props.className
      }, this.props.children);
    } else {
      return React.cloneElement(this.props.children, {
        style: Object.assign({}, this.props.children.props.style, style)
      });
    }
  }
}

/* eslint-disable */
View.propTypes = {
  show: PropTypes.any,
  component: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};
/* eslint-enable */

View.defaultProps = {
  component: 'span'
}
View._typeName = 'View';

Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};
