'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

var _locale = require('../Common/locale');

var _locale2 = _interopRequireDefault(_locale);

require('../Common/css/Table.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          React.createElement(_TableHeader2.default, _extends({}, this.props, {
            style: { width: layout.bodyWidth || '' }
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
          React.createElement(_TableBody2.default, _extends({}, this.props, {
            style: { width: this.bodyWidth }
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
              _locale2.default.t('ishow.table.emptyText')
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
          React.createElement(_TableFooter2.default, _extends({}, this.props, {
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
            React.createElement(_TableHeader2.default, _extends({
              fixed: 'left'
            }, this.props, {
              style: { width: layout.fixedWidth || '' }
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
            React.createElement(_TableBody2.default, _extends({
              fixed: 'left'
            }, this.props, {
              style: { width: layout.fixedWidth || '' }
            }))
          ),
          props.showSummary && React.createElement(
            'div',
            { className: 'ishow-table__fixed-footer-wrapper', ref: this.bindRef('fixedFooterWrapper') },
            React.createElement(_TableFooter2.default, _extends({
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
            React.createElement(_TableHeader2.default, _extends({
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
            React.createElement(_TableBody2.default, _extends({
              fixed: 'right'
            }, this.props, {
              style: { width: layout.rightFixedWidth || '' }
            }))
          ),
          props.showSummary && React.createElement(
            'div',
            {
              className: 'ishow-table__fixed-footer-wrapper',
              ref: this.bindRef('rightFixedFooterWrapper'),
              style: { visibility: props.data && props.data.length ? 'visible' : 'hidden' }
            },
            React.createElement(_TableFooter2.default, _extends({
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
}(_index2.default);

Table.contextTypes = {
  store: _propTypes2.default.any,
  layout: _propTypes2.default.any
};
Table.childContextTypes = {
  table: _propTypes2.default.any
};
exports.default = Table;