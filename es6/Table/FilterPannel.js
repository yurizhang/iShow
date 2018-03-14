var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import ReactDOM from 'react-dom';
import { default as Component, View } from '../Common/plugs/index.js'; //提供style, classname方法
import Transition from '../Message/transition';
import Popper from '../Common/popper';
import Checkbox from '../Checkbox/CheckBox';
import CheckboxGroup from '../Checkbox/CheckBoxGroup';
import local from '../Common/locale';
import '../Common/css/Table-column.css';
Checkbox.Group = CheckboxGroup;
function getPopupContainer() {
  var container = document.createElement('div');
  container.className = 'ishow-table-poper';
  container.style.zIndex = 999;
  document.body.appendChild(container);
  return container;
}

var FilterPannel = function (_Component) {
  _inherits(FilterPannel, _Component);

  function FilterPannel(props) {
    _classCallCheck(this, FilterPannel);

    var _this = _possibleConstructorReturn(this, (FilterPannel.__proto__ || Object.getPrototypeOf(FilterPannel)).call(this, props));

    _this.container = getPopupContainer();
    ['handleClickOutside', 'onEnter', 'onAfterLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });

    _this.state = {
      filteredValue: props.filteredValue
    };
    return _this;
  }

  _createClass(FilterPannel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderPortal(this.renderContent(), this.container);

      document.addEventListener('click', this.handleClickOutside);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.filteredValue !== nextProps.filteredValue) {
        this.setState({ filteredValue: nextProps.filteredValue });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderPortal(this.renderContent(), this.container);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log(this.poperIns);
      if (this.poperIns !== undefined) {
        this.poperIns.destroy();
      }
      //this.poperIns.destroy();
      ReactDOM.unmountComponentAtNode(this.container);
      document.removeEventListener('click', this.handleClickOutside);
      document.body.removeChild(this.container);
    }
  }, {
    key: 'handleFiltersChange',
    value: function handleFiltersChange(value) {
      this.setState({
        filteredValue: value
      });
    }
  }, {
    key: 'changeFilteredValue',
    value: function changeFilteredValue(value) {
      this.props.onFilterChange(value);
      this.props.toggleFilter();
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.props.visible) {
        this.props.toggleFilter();
      }
    }
  }, {
    key: 'onEnter',
    value: function onEnter() {
      this.poperIns = new Popper(this.refer, this.container, {
        placement: this.props.placement
      });
    }
  }, {
    key: 'onAfterLeave',
    value: function onAfterLeave() {
      this.poperIns.destroy();
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(element, container) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, element, container);
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _this2 = this;

      var _props = this.props,
          multiple = _props.multiple,
          filters = _props.filters,
          visible = _props.visible;
      var filteredValue = this.state.filteredValue;


      var content = void 0;
      if (multiple) {
        content = [React.createElement(
          'div',
          { className: 'ishow-table-filter__content', key: 'content' },
          React.createElement(
            Checkbox.Group,
            { value: filteredValue || [], onChange: this.handleFiltersChange.bind(this), className: 'ishow-table-filter__checkbox-group' },
            filters && filters.map(function (filter) {
              return React.createElement(Checkbox, { value: filter.value, label: filter.text, key: filter.value });
            })
          )
        ), React.createElement(
          'div',
          { className: 'ishow-table-filter__bottom', key: 'bottom' },
          React.createElement(
            'button',
            {
              className: this.classNames({ 'is-disabled': !filteredValue || !filteredValue.length }),
              disabled: !filteredValue || !filteredValue.length,
              onClick: this.changeFilteredValue.bind(this, filteredValue)
            },
            local.t('ishow.table.confirmFilter')
          ),
          React.createElement(
            'button',
            { onClick: this.changeFilteredValue.bind(this, null) },
            local.t('ishow.table.resetFilter')
          )
        )];
      } else {
        content = React.createElement(
          'ul',
          { className: 'ishow-table-filter__list' },
          React.createElement(
            'li',
            {
              className: this.classNames('ishow-table-filter__list-item', { 'is-active': !filteredValue }),
              onClick: this.changeFilteredValue.bind(this, null)
            },
            local.t('ishow.table.clearFilter')
          ),
          filters && filters.map(function (filter) {
            return React.createElement(
              'li',
              {
                key: filter.value,
                className: _this2.classNames('ishow-table-filter__list-item', { 'is-active': filter.value === filteredValue }),
                onClick: _this2.changeFilteredValue.bind(_this2, filter.value)
              },
              filter.text
            );
          })
        );
      }

      return React.createElement(
        Transition,
        {
          name: 'ishow-zoom-in-top',
          onEnter: this.onEnter,
          onAfterLeave: this.onAfterLeave
        },
        React.createElement(
          View,
          { show: visible },
          React.createElement(
            'div',
            {
              className: 'ishow-table-filter',
              ref: function ref(dom) {
                _this2.poper = dom;
              },
              onClick: function onClick(e) {
                e.nativeEvent.stopImmediatePropagation();
              } // prevent document click event
            },
            content
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.cloneElement(this.props.children, {
        ref: function ref(dom) {
          _this3.refer = dom;
        }
      });
    }
  }]);

  return FilterPannel;
}(Component);

export default FilterPannel;