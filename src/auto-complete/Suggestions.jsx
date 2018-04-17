import React from 'react';
import ReactDOM from 'react-dom';
import Popper from '../Common/utils/popper';
import Transition from '../Message/transition';
import PropTypes from 'prop-types';
import {default as Component,View,} from '../Common/plugs/index.js'; //提供style, classname方法
import { Scrollbar } from '../Scrollbar';
import '../Common/css/Autocomplete.css'


export default class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
  }

  onVisibleChange(visible, inputWidth) {
    this.setState({
      dropdownWidth: inputWidth,
      showPopper: visible
    });
  }

  parent() {
    return this.context.component;
  }

  onSelect(item) {
    this.parent().select(item);
  }

  onEnter(){
    const reference = ReactDOM.findDOMNode(this.parent().inputNode);

    this.popperJS = new Popper(reference, this.refs.popper, {
      gpuAcceleration: false,
      forceAbsolute: true
    });
  }

  onAfterLeave(){
    this.popperJS.destroy();
  }

  render(){
    const { customItem } = this.parent().props;
    const { loading, highlightedIndex } = this.parent().state;
    const { suggestions } = this.props;
    const { showPopper, dropdownWidth } = this.state;

    return (
      <Transition name="ishow-zoom-in-top" onEnter={this.onEnter.bind(this)} onAfterLeave={this.onAfterLeave.bind(this)}>
        <View show={showPopper}>
          <div
            ref="popper"
            className={this.classNames('ishow-autocomplete-suggestion', 'ishow-popper', {
              'is-loading': loading
            })}
            style={{
              width: dropdownWidth,
              zIndex: 1
            }}
          >
            <Scrollbar
              viewComponent="ul"
              wrapClass="ishow-autocomplete-suggestion__wrap"
              viewClass="ishow-autocomplete-suggestion__list"
            >
              {
                loading ? (
                  <li><i className="ishow-icon-loading"></i></li>
                ) : suggestions.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={this.classNames({'highlighted': highlightedIndex === index})}
                      onClick={this.onSelect.bind(this, item)}>
                      {
                        !customItem ? item.value : React.createElement(customItem, {
                          index,
                          item
                        })
                      }
                      {/* {
                        <div><div className="name">{item.value}</div><span className="addr">{item.address}</span></div>
                      } */}
                    </li>
                  )
                })
              }
            </Scrollbar>
          </div>
        </View>
      </Transition>
    )
  }
}

Suggestions.contextTypes = {
  component: PropTypes.any
};
