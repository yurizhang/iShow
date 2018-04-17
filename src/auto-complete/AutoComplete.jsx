import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';
import {default as Component} from '../Common/plugs/index.js'; //提供style, classname方法
import Input from '../Input';
import Suggestions from './Suggestions';
import '../Common/css/Autocomplete.css' 

class AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value,
      isFocus: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
  }

  getChildContext() {
    return {
      component: this
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ inputValue: props.value });
  }

  componentDidUpdate() {
    const visible = this.suggestionVisible();
    const reference = (this.inputNode)?ReactDOM.findDOMNode(this.inputNode):null;
    if (reference instanceof HTMLElement) {
      setTimeout(() => {
        //if(visible && reference && reference.offsetWidth)
        if(reference && reference.offsetWidth){
          console.log(this.suggestionsNode)
          this.suggestionsNode.onVisibleChange(visible, reference.offsetWidth);
        }
      })
    }
  }

  getData(queryString) {
    this.setState({ loading: true });

    this.props.fetchSuggestions(queryString, (suggestions) => {
      this.setState({ loading: false });

      if (Array.isArray(suggestions)) {
        this.setState({ suggestions });
      }
    });
  }

  handleChange(value) {
    this.setState({ inputValue: value });

    if (!this.props.triggerOnFocus && !value) {
      this.setState({ suggestions: [] }); return;
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.getData(value);
  }

  handleFocus(e) {
    this.setState({ isFocus: true });
    if (this.props.onFocus) this.props.onFocus(e);
    if (this.props.triggerOnFocus) {
      this.getData(this.state.inputValue);
    }
  }

  handleKeyEnter(highlightedIndex) {
    if (this.suggestionVisible() && highlightedIndex >= 0 && highlightedIndex < this.state.suggestions.length) {
      this.select(this.state.suggestions[highlightedIndex]);
    }
  }

  handleClickOutside() {
    if (this.state.isFocus) {
      this.setState({ isFocus: false });
    }
  }

  select(item) {
    this.setState({ inputValue: item.value }, () => {
      this.setState({ suggestions: [] });
    });

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  }

  highlight(index) {
    if (!this.suggestionVisible() || this.state.loading) return;
    if (index < 0) index = 0;
    if (index >= this.state.suggestions.length) {
      index = this.state.suggestions.length - 1;
    }
    const reference = ReactDOM.findDOMNode(this.suggestionsNode);
    if (reference instanceof HTMLElement) {
      const suggestion = document.querySelector('.ishow-autocomplete-suggestion__wrap');
      const suggestionList = document.querySelectorAll('.ishow-autocomplete-suggestion__list li');
      if (suggestion instanceof HTMLElement && suggestionList instanceof NodeList) {
        let highlightItem = suggestionList[index];
        let scrollTop = suggestion.scrollTop;
        let offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > (scrollTop + suggestion.clientHeight)) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }

        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }

        this.setState({ highlightedIndex: index });
      }
    }
  }

  /* Computed Methods */

  suggestionVisible() {
    const suggestions = this.state.suggestions;
    const isValidData = Array.isArray(suggestions) && suggestions.length > 0;

    return (isValidData || this.state.loading) && this.state.isFocus;
  }

  onKeyDown(e) {
    const { highlightedIndex } = this.state;

    switch (e.keyCode) {
      case 13:
        this.handleKeyEnter(highlightedIndex);
        break;
      case 38:
        this.highlight(highlightedIndex - 1)
        break;
      case 40:
        this.highlight(highlightedIndex + 1);
        break;
      default:
        break;
    }
  }

  render(){
    const { disabled, placeholder, name, size, icon, append, prepend, onIconClick, popperClass } = this.props;
    const { inputValue, suggestions } = this.state;

    return (
      <div style={this.style()} className={this.className('ishow-autocomplete')}>
        <Input
          ref={node => this.inputNode = node}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          size={size}
          icon={icon}
          prepend={prepend}
          append={append}
          onIconClick={onIconClick}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.props.onBlur}
          onKeyDown={this.onKeyDown.bind(this)}
        />
        <Suggestions
          ref={node => this.suggestionsNode = node}
          className={this.classNames(popperClass)}
          suggestions={suggestions}
        />
      </div>
    )
  }
}

AutoComplete.childContextTypes = {
  component: PropTypes.any
};

AutoComplete.defaultProps = {
  triggerOnFocus: true
}

export default ClickOutside(AutoComplete);
