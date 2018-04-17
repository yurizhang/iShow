import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法 //提供style, classname方法
import '../Common/css/Carousel-item.css';

export default class CarouselItem extends Component {
  state;

  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
  }

  componentWillMount() {
    this.parent().addItem(this);
  }

  componentWillUnmount() {
    this.parent().removeItem(this);
  }

  get isFlat() {
    return this.parent().props.type === 'flatcard';
  }

  get CARD_SCALE() {
     return this.isFlat ? 1 : 0.83;
  }

  get calculateWidth() {
    if (this.isFlat) {
      return parseInt(100 / 3) + '%';
    }
  }

  processIndex(index, activeIndex, length) {
    if (activeIndex === 0 && index === length - 1) {
      return -1;
    } else if (activeIndex === length - 1 && index === 0) {
      return length;
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1;
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2;
    }

    return index;
  }

  calculateTranslate(index, activeIndex, parentWidth) {
    const denominator = this.isFlat ? 3 : 4;
    if (this.state.inStage) {
      return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
    } else if (index < activeIndex) {
      return -(1 + this.CARD_SCALE) * parentWidth / denominator;
    } else {
      return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
    }
  }

  translateItem(index, activeIndex, oldIndex) {
    const parent = ReactDOM.findDOMNode(this.parent());
    const parentWidth = parent.offsetWidth;
    const length = this.parent().state.items.length;

    if (!this.parent().iscard && oldIndex !== undefined) {
      this.state.animating = index === activeIndex || index === oldIndex;
    }

    if (index !== activeIndex && length > 2) {
      index = this.processIndex(index, activeIndex, length);
    }

    if (this.parent().iscard) {
      this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
      this.state.active = index === activeIndex;
      this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
      this.state.scale = this.state.active ? 1 : this.CARD_SCALE;
    } else {
      this.state.active = index === activeIndex;
      this.state.translate = parentWidth * (index - activeIndex);
    }

    this.state.ready = true;

    this.forceUpdate();
  }

  handleItemClick() {
    if (this.parent().iscard) {
      const index = this.parent().state.items.indexOf(this);
      this.parent().setActiveItem(index);
    }
  }

  parent() {
    return this.context.component;
  }

  render() {
    const { hover, translate, scale, active, ready, inStage, animating } = this.state;

    return (
      <View show={ready}>
        <div
          className={this.className('ishow-carousel__item', {
            'is-active': active,
            'ishow-carousel__item--card': this.parent().iscard,
            'is-in-stage': inStage,
            'is-hover': hover,
            'is-animating': animating
          })}
          onClick={this.handleItemClick.bind(this)}
          style={{
            msTransform: `translateX(${ translate }px) scale(${ scale })`,
            WebkitTransform: `translateX(${ translate }px) scale(${ scale })`,
            transform: `translateX(${ translate }px) scale(${ scale })`
          }}>
          {
            this.parent().iscard && (
              <View show={!active}>
                <div className="ishow-carousel__mask" />
              </View>
            )
          }
          {this.props.children}
        </div>
      </View>
    )
  }
}

CarouselItem.contextTypes = {
  component: PropTypes.any
};