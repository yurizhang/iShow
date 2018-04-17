var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import local from '../Common/locale';
import '../Common/css/Table.css';
// let tableIdSeed = 1;

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {};

    // this.tableId = `ishow-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  _createClass(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        table: this
      };
    }
  }, {
    key: 'syncScroll',
    value: function syncScroll() {
      var headerWrapper = this.headerWrapper,
          footerWrapper = this.footerWrapper,
          bodyWrapper = this.bodyWrapper,
          fixedBodyWrapper = this.fixedBodyWrapper,
          rightFixedBodyWrapper = this.rightFixedBodyWrapper;

      if (headerWrapper) {
        headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
      }
      if (footerWrapper) {
        footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
      }

      if (fixedBodyWrapper) {
        fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
      }
      if (rightFixedBodyWrapper) {
        rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
      }
    }
  }, {
    key: 'bindRef',
    value: function bindRef(key) {
      var _this2 = this;

      return function (node) {
        _this2[key] = node;
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          props = _objectWithoutProperties(_props, ['store', 'layout']);

      var isHidden = this.state.isHidden;


      return React.createElement(
        'div',
        {
          style: this.style({
            height: props.height,
            maxHeight: props.maxHeight
          }),
          className: this.className('ishow-table', {
            'ishow-table--fit': props.fit,
            'ishow-table--striped': props.stripe,
            'ishow-table--border': props.border,
            'ishow-table--hidden': isHidden,
            'ishow-table--fluid-height': props.maxHeight,
            'ishow-table--enable-row-hover': !store.isComplex,
            'ishow-table--enable-row-transition': (store.data || []).length && (store.data || []).length < 100
          }),
          ref: this.bindRef('el')
        },
        props.showHeader && React.createElement(
          'div',
          { className: 'ishow-table__header-wrapper', ref: this.bindRef('headerWrapper') },
          React.createElement(TableHeader, Object.assign({}, this.props, {
            style: { width: '100%' || '', height: '100%' }
          }))
        ),
        React.createElement(
          'div',
          {
            style: this.bodyWrapperHeight,
            className: 'ishow-table__body-wrapper',
            ref: this.bindRef('bodyWrapper'),
            onScroll: this.syncScroll
          },
          React.createElement(TableBody, Object.assign({}, this.props, {
            style: { width: '100%', height: '100%' }
          })),
          (!props.data || !props.data.length) && React.createElement(
            'div',
            {
              style: { width: this.bodyWidth },
              className: 'ishow-table__empty-block'
            },
            React.createElement(
              'span',
              { className: 'ishow-table__empty-text' },
              props.emptyText ? props.emptyText : local.t('ishow.table.emptyText')
            )
          )
        ),
        props.showSummary && React.createElement(
          'div',
          {
            style: { visibility: props.data && props.data.length ? 'visible' : 'hidden' },
            className: 'ishow-table__footer-wrapper',
            ref: this.bindRef('footerWrapper')
          },
          React.createElement(TableFooter, Object.assign({}, this.props, {
            style: { width: layout.bodyWidth || '' }
          }))
        ),
        !!store.fixedColumns.length && React.createElement(
          'div',
          {
            style: Object.assign({}, this.fixedHeight, {
              width: layout.fixedWidth || ''
            }),
            className: 'ishow-table__fixed',
            ref: this.bindRef('fixedWrapper')
          },
          props.showHeader && React.createElement(
            'div',
            { className: 'ishow-table__fixed-header-wrapper', ref: this.bindRef('fixedHeaderWrapper') },
            React.createElement(TableHeader, Object.assign({
              fixed: 'left'
            }, this.props, {
              style: { width: layout.fixedWidth || '', height: '100%' }
            }))
          ),
          React.createElement(
            'div',
            {
              style: Object.assign({}, this.fixedBodyHeight, {
                top: layout.headerHeight || 0
              }),
              className: 'ishow-table__fixed-body-wrapper',
              ref: this.bindRef('fixedBodyWrapper')
            },
            React.createElement(TableBody, Object.assign({
              fixed: 'left'
            }, this.props, {
              style: { width: layout.fixedWidth || '', height: '100%' }
            }))
          ),
          props.showSummary && React.createElement(
            'div',
            { className: 'ishow-table__fixed-footer-wrapper', ref: this.bindRef('fixedFooterWrapper') },
            React.createElement(TableFooter, Object.assign({
              fixed: 'left'
            }, this.props, {
              style: { width: layout.fixedWidth || '' }
            }))
          )
        ),
        !!store.rightFixedColumns.length && React.createElement(
          'div',
          {
            className: 'ishow-table__fixed-right',
            ref: this.bindRef('rightFixedWrapper'),
            style: Object.assign({}, {
              width: layout.rightFixedWidth || '',
              right: layout.scrollY ? props.border ? layout.gutterWidth : layout.gutterWidth || 1 : ''
            }, this.fixedHeight)
          },
          props.showHeader && React.createElement(
            'div',
            { className: 'ishow-table__fixed-header-wrapper', ref: this.bindRef('rightFixedHeaderWrapper') },
            React.createElement(TableHeader, Object.assign({
              fixed: 'right'
            }, this.props, {
              style: { width: layout.rightFixedWidth || '' }
            }))
          ),
          React.createElement(
            'div',
            {
              className: 'ishow-table__fixed-body-wrapper',
              ref: this.bindRef('rightFixedBodyWrapper'),
              style: Object.assign({}, {
                top: layout.headerHeight
              }, this.fixedBodyHeight)
            },
            React.createElement(TableBody, Object.assign({
              fixed: 'right'
            }, this.props, {
              style: { width: layout.rightFixedWidth || '', height: '100%' }
            }))
          ),
          props.showSummary && React.createElement(
            'div',
            {
              className: 'ishow-table__fixed-footer-wrapper',
              ref: this.bindRef('rightFixedFooterWrapper'),
              style: { visibility: props.data && props.data.length ? 'visible' : 'hidden' }
            },
            React.createElement(TableFooter, Object.assign({
              fixed: 'right'
            }, this.props, {
              style: { width: layout.rightFixedWidth || '' }
            }))
          )
        ),
        !!store.rightFixedColumns.length && React.createElement('div', {
          className: 'ishow-table__fixed-right-patch',
          style: { width: layout.scrollY ? layout.gutterWidth : '0', height: layout.headerHeight }
        }),
        React.createElement('div', { className: 'ishow-table__column-resize-proxy', ref: this.bindRef('resizeProxy'), style: { visibility: 'hidden' } })
      );
    }
  }, {
    key: 'bodyWrapperHeight',
    get: function get() {
      var _props2 = this.props,
          layout = _props2.layout,
          height = _props2.height,
          maxHeight = _props2.maxHeight;

      var style = {};

      if (height) {
        style.height = layout.bodyHeight || '';
      } else if (maxHeight) {
        if (layout.headerHeight !== null) {
          // 非首次渲染
          style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight;
        }
      }

      return style;
    }
  }, {
    key: 'bodyWidth',
    get: function get() {
      var layout = this.props.layout;
      var bodyWidth = layout.bodyWidth,
          scrollY = layout.scrollY,
          gutterWidth = layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
    }
  }, {
    key: 'fixedHeight',
    get: function get() {
      var layout = this.props.layout;

      return {
        bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
      };
    }
  }, {
    key: 'fixedBodyHeight',
    get: function get() {
      var _props3 = this.props,
          layout = _props3.layout,
          props = _objectWithoutProperties(_props3, ['layout']);

      var style = {};

      if (props.height) {
        style.height = layout.fixedBodyHeight || '';
      } else if (props.maxHeight) {
        if (layout.headerHeight !== null) {
          style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
        }
      }

      return style;
    }
  }]);

  return Table;
}(Component);

Table.contextTypes = {
  store: PropTypes.any,
  layout: PropTypes.any
};
Table.childContextTypes = {
  table: PropTypes.any
};
export default Table;