import React from 'react';
import '../Common/css/Rate.css';
import '../Common/css/Icon.css';
import {default as Component} from '../Common/plugs/index.js'; 
import PropTypes from 'prop-types';

export default class Rate extends Component {
  state;
  classMap;
  colorMap;

  constructor(props) {
    super(props);

    this.state = {
      pointerAtLeftHalf: false,
      currentValue: this.props.value - 1,
      hoverIndex: -1,
      value: -1,
    };
    const {
      iconClasses,
      voidIconClass,
      disabledVoidIconClass,
      colors,
      voidColor,
      disabledVoidColor
    } = this.props;

    this.classMap = {
      lowClass: iconClasses[0],
      mediumClass: iconClasses[1],
      highClass: iconClasses[2],
      voidClass: voidIconClass,
      disabledVoidClass: disabledVoidIconClass
    };

    this.colorMap = {
      lowColor: colors[0],
      mediumColor: colors[1],
      highColor: colors[2],
      voidColor: voidColor,
      disabledVoidColor: disabledVoidColor
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  hasClass(target, classname) {
    return target.classList.contains(classname)
  }

  setCurrentValue(e, value) {
    const { disabled, allowHalf } = this.props;
    if (disabled) {
      return;
    }
    /* istanbul ignore if */
    if (allowHalf) {
      e.persist()
      let target = e.target;
      if (this.hasClass(target, 'ishow-rate__item')) {
        target = target.querySelector('.ishow-rate__icon');
      }
      if (this.hasClass(target, 'ishow-rate__decimal')) {
        target = target.parentNode;
      }
      this.setState({
        pointerAtLeftHalf: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth,
        currentValue: ((e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth) ? value - 0.5 : value
      })
    } else {
      this.setState({
        currentValue: value
      });
    }
    this.setState({
      hoverIndex: value
    });
  }

  getValueFromMap(value, map) {
    const { lowThreshold, highThreshold } = this.props;
    let result = '';
    if (value <= lowThreshold - 1) {
      result = map.lowColor || map.lowClass;
    } else if (value >= highThreshold - 1) {
      result = map.highColor || map.highClass;
    } else {
      result = map.mediumColor || map.mediumClass;
    }

    return result;
  }

  getIconStyle(item){
    const { disabled } = this.props;
    const { currentValue } = this.state;
    const voidColor = disabled
      ? this.colorMap.disabledVoidColor
      : this.colorMap.voidColor;
    return {
      color: item <= currentValue ? this.activeColor() : voidColor
    };
  }

  showDecimalIcon(item){
    const { disabled, allowHalf, value } = this.props;
    const { pointerAtLeftHalf, currentValue } = this.state;
    let showWhenDisabled = disabled &&
      this.valueDecimal() > 0 &&
      item - 1 < value - 1 &&
      item > value - 1;
    /* istanbul ignore next */
    let showWhenAllowHalf = allowHalf &&
      pointerAtLeftHalf &&
      (item - 0.5).toFixed(1) === currentValue.toFixed(1);
    return showWhenDisabled || showWhenAllowHalf;
  }

  classes(){
    const { currentValue } = this.state;
    const { allowHalf, max } = this.props;
    let result = [];
    let i = 0;
    let threshold = currentValue;
    if (allowHalf && currentValue !== Math.floor(currentValue)) {
      threshold;
    }
    for (; i <= threshold; i++) {
      result.push(this.activeClass());
    }
    for (; i < max; i++) {
      result.push(this.voidClass());
    }
    return result;
  }

  valueDecimal() {
    const { value } = this.props;
    return value * 100 - Math.floor(value) * 100;
  }

  decimalIconClass() {
    return this.getValueFromMap(this.props.value, this.classMap);
  }

  voidClass() {
    return this.props.disabled
      ? this.classMap.disabledVoidClass
      : this.classMap.voidClass;
  }

  activeClass() {
    return this.getValueFromMap(this.state.currentValue, this.classMap);
  }

  activeColor(){
    return this.getValueFromMap(this.state.currentValue, this.colorMap);
  }

  selectValue(value){
    const { disabled, allowHalf, onChange } = this.props;
    const { pointerAtLeftHalf, currentValue } = this.state;
    if (disabled) {
      return;
    }
    if (allowHalf && pointerAtLeftHalf) {
      // this.$emit('input', this.currentValue);
      this.setState({
        value: currentValue,
      }, () => {
        onChange && onChange(currentValue + 1);
      })
    } else {
      this.setState({
        currentValue: value,
        value,
      }, () => {
        onChange && onChange(value + 1);
      })
    }
  }

  decimalStyle() {
    const { disabled, allowHalf } = this.props;
    let width = '';
    if (disabled) {
      width = `${this.valueDecimal() < 50 ? 0 : 50}%`;
    }
    if (allowHalf) {
      width = '50%';
    }
    return {
      color: this.activeColor(),
      width
    };
  }

  showText(){
    const { disabled, texts, textTemplate, value } = this.props;
    const { currentValue } = this.state;
    let result = '';
    if (disabled) {
      result = textTemplate.replace(/\{\s*value\s*\}/, value);
    } else {
      result = texts[Math.ceil(currentValue)];
    }
    return result;
  }

  resetCurrentValue() {
    const { disabled, allowHalf } = this.props;
    const { value } = this.state;
    if (disabled) {
      return;
    }
    if (allowHalf) {
      this.setState({
        pointerAtLeftHalf: value !== Math.floor(value)
      });
    }
    this.setState({
      currentValue: value,
      hoverIndex: -1
    });
  }

  render(){
    const { showText, textColor, disabled, max } = this.props;
    const { hoverIndex } = this.state;
    return (
      <div style={this.style()} className={this.className('ishow-rate')}>
        {[...Array(max)].map((v, k) => (
          <span
            className="ishow-rate__item"
            style={{ cursor: disabled ? 'auto' : 'pointer' }}
            onClick={() => this.selectValue(k)}
            onMouseMove={(e) => this.setCurrentValue(e, k)}
            onMouseLeave={() => this.resetCurrentValue()}
            key={k}
          >
            <i
              style={this.getIconStyle(k)}
              className={
                hoverIndex === k
                  ? `hover ishow-rate__icon ${this.classes()[k]}`
                  : `ishow-rate__icon ${this.classes()[k]}`
              }
            >
              {this.showDecimalIcon(k)
                ? <i
                    style={this.decimalStyle()}
                    className={`ishow-rate__decimal ${this.decimalIconClass()}`}
                  />
                : null}

            </i>
          </span>
        ))}
        {showText
          ? <span className="ishow-rate__text" style={{ color: textColor }}>
              {this.showText()}
            </span>
          : null}

      </div>
    );
  }
}

Rate.propTypes = {
  colors: PropTypes.array,
  texts: PropTypes.array,
  showText: PropTypes.bool,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  textTemplate: PropTypes.string,
  lowThreshold: PropTypes.number,
  highThreshold: PropTypes.number,
  max: PropTypes.number,
  voidColor: PropTypes.string,
  disabledVoidColor: PropTypes.string,
  iconClasses: PropTypes.array,
  voidIconClass: PropTypes.string,
  disabledVoidIconClass: PropTypes.string,
  allowHalf: PropTypes.bool
};

Rate.defaultProps = {
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  texts: ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  showText: false, // 是否显示辅助文字
  textColor: '#1F2D3D', //   辅助文字的颜色
  disabled: false, // 是否为只读
  value: 0, // 星级
  lowThreshold: 2, // 低分和中等分数的界限值，值本身被划分在低分中
  highThreshold: 4, // 高分和中等分数的界限值，值本身被划分在高分中
  max: 5,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: ['ishow-icon-star-on', 'ishow-icon-star-on', 'ishow-icon-star-on'],
  voidIconClass: 'ishow-icon-star-off',
  disabledVoidIconClass: 'ishow-icon-star-on',
  allowHalf: false,
  textTemplate: '{value}'
};
