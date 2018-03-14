'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import PropTypes from 'prop-types';
//提供style, classname方法


// import Checkbox from '../Checkbox/CheckBox';
// import Tag from '../Tag/Tag';

// import {toDate} from "../date-picker/utils/index";

var TableFooter = function (_Component) {
  _inherits(TableFooter, _Component);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _possibleConstructorReturn(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
  }

  _createClass(TableFooter, [{
    key: 'isCellHidden',
    value: function isCellHidden(index, columns) {
      var fixed = this.props.fixed;

      if (fixed === true || fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          fixed = _props.fixed,
          summaryMethod = _props.summaryMethod,
          sumText = _props.sumText;

      var sums = summaryMethod ? summaryMethod(store.columns, store.data) : store.columns.map(function (column, index) {
        if (index === 0) {
          return sumText;
        }
        var result = store.data.reduce(function (pre, data) {
          return pre + parseFloat((0, _utils.getValueByPath)(data, column.property));
        }, 0);
        return isNaN(result) ? '' : result;
      });

      return React.createElement(
        'table',
        {
          className: 'ishow-table__footer',
          cellSpacing: '0',
          cellPadding: '0',
          style: this.style({
            borderSpacing: 0,
            border: 0
          })
        },
        React.createElement(
          'colgroup',
          null,
          store.columns.map(function (column, index) {
            return React.createElement('col', {
              style: {
                width: column.realWidth
              },
              key: index
            });
          }),
          !fixed && React.createElement('col', {
            style: { width: layout.scrollY ? layout.gutterWidth : 0 }
          })
        ),
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            store.columns.map(function (column, index) {
              return React.createElement(
                'td',
                {
                  key: index,
                  colSpan: column.colSpan,
                  rowSpan: column.rowSpan,
                  className: _this2.className(column.headerAlign, column.className, column.labelClassName, column.columnKey, {
                    'is-hidden': _this2.isCellHidden(index, store.columns),
                    'is-leaf': !column.subColumns
                  })
                },
                React.createElement(
                  'div',
                  { className: 'cell' },
                  sums[index]
                )
              );
            }),
            !fixed && React.createElement('td', {
              className: 'gutter',
              style: { width: layout.scrollY ? layout.gutterWidth : 0 }
            })
          )
        )
      );
    }
  }, {
    key: 'columnsCount',
    get: function get() {
      return this.props.store.columns.length;
    }
  }, {
    key: 'leftFixedCount',
    get: function get() {
      return this.props.store.fixedColumns.length;
    }
  }, {
    key: 'rightFixedCount',
    get: function get() {
      return this.props.store.rightFixedColumns.length;
    }
  }]);

  return TableFooter;
}(_index2.default);

exports.default = TableFooter;