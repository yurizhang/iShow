import * as React from 'react';
import ReactDOM from 'react-dom';
import {default as Component,View} from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Popper from '../Common/popper';
import Checkbox from '../Checkbox/CheckBox';
import CheckboxGroup from '../Checkbox/CheckBoxGroup';
import local from '../Common/locale';
import '../Common/css/Table-column.css';
Checkbox.Group = CheckboxGroup;
function getPopupContainer() {
  const container = document.createElement('div');
  container.className = 'ishow-table-poper';
  container.style.zIndex = 999;
  document.body.appendChild(container);
  return container;
}

export default class FilterPannel extends Component {
  constructor(props) {
    super(props);

    this.container = getPopupContainer();
    ['handleClickOutside', 'onEnter', 'onAfterLeave'].forEach(fn => { this[fn] = this[fn].bind(this) });

    this.state = {
      filteredValue: props.filteredValue,
    }
  }

  componentDidMount() {
    this.renderPortal(this.renderContent(), this.container);

    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filteredValue !== nextProps.filteredValue) {
      this.setState({ filteredValue: nextProps.filteredValue })
    }
  }

  componentDidUpdate() {
    this.renderPortal(this.renderContent(), this.container);
  }

  componentWillUnmount() {
    console.log(this.poperIns);
    if(this.poperIns!==undefined){
      this.poperIns.destroy();
    }
    //this.poperIns.destroy();
    ReactDOM.unmountComponentAtNode(this.container);
    document.removeEventListener('click', this.handleClickOutside);
    document.body.removeChild(this.container);
  }

  handleFiltersChange(value) {
    this.setState({
      filteredValue: value
    })
  }

  changeFilteredValue(value)  {
    this.props.onFilterChange(value);
    this.props.toggleFilter();
  }

  handleClickOutside() {
    if (this.props.visible) {
      this.props.toggleFilter();
    }
  }

  onEnter() {
    this.poperIns = new Popper(this.refer, this.container, {
      placement: this.props.placement
    });
  }

  onAfterLeave() {
    this.poperIns.destroy();
  }

  renderPortal(element, container) {
    ReactDOM.unstable_renderSubtreeIntoContainer(this, element, container);
  }

  renderContent() {
    const { multiple, filters, visible } = this.props;
    const { filteredValue } = this.state;

    let content;
    if (multiple) {
      content = [(
        <div className="ishow-table-filter__content" key="content">
          <Checkbox.Group value={filteredValue || []} onChange={this.handleFiltersChange.bind(this)} className="ishow-table-filter__checkbox-group">
            {filters && filters.map(filter => (
              <Checkbox value={filter.value} label={filter.text} key={filter.value} />
            ))}
          </Checkbox.Group>
        </div>
      ), (
        <div className="ishow-table-filter__bottom" key="bottom">
          <button
            className={this.classNames({ 'is-disabled': !filteredValue || !filteredValue.length })}
            disabled={!filteredValue || !filteredValue.length}
            onClick={this.changeFilteredValue.bind(this, filteredValue)}
          >
            {local.t('ishow.table.confirmFilter')}
          </button>
          <button onClick={this.changeFilteredValue.bind(this, null)}>{local.t('ishow.table.resetFilter')}</button>
        </div>
      )]
    } else {
      content = (
        <ul className="ishow-table-filter__list">
          <li
            className={this.classNames('ishow-table-filter__list-item', { 'is-active': !filteredValue })}
            onClick={this.changeFilteredValue.bind(this, null)}
          >
            {local.t('ishow.table.clearFilter')}
          </li>
          {filters && filters.map(filter => (
            <li
              key={filter.value}
              className={this.classNames('ishow-table-filter__list-item', { 'is-active': filter.value === filteredValue })}
              onClick={this.changeFilteredValue.bind(this, filter.value)}
            >
              {filter.text}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <Transition
        name="ishow-zoom-in-top"
        onEnter={this.onEnter}
        onAfterLeave={this.onAfterLeave}
      >
        <View show={visible}>
          <div
            className={'ishow-table-filter'}
            ref={(dom) => { this.poper = dom; }}
            onClick={(e) => { e.nativeEvent.stopImmediatePropagation() }}  // prevent document click event
          >
            {content}
          </div>
        </View>
      </Transition>
    )
  }
  render() {
    return React.cloneElement(this.props.children, {
      ref: (dom) => { this.refer = dom; }
    });
  }
}
