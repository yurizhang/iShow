'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils = require('./utils');

var _CheckBox = require('../Checkbox/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //getValueByPath notUsed
// import {toDate} from "../date-picker/utils/index";

// import Tag from '../Tag/Tag';


var TableBody = function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    _classCallCheck(this, TableBody);

    var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

    ['handleMouseLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  _createClass(TableBody, [{
    key: 'handleMouseEnter',
    value: function handleMouseEnter(index) {
      this.context.store.setHoverRow(index);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.context.store.setHoverRow(null);
    }
  }, {
    key: 'handleCellMouseEnter',
    value: function handleCellMouseEnter(row, column, event) {
      this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
    }
  }, {
    key: 'handleCellMouseLeave',
    value: function handleCellMouseLeave(row, column, event) {
      this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
    }
  }, {
    key: 'handleCellClick',
    value: function handleCellClick(row, column, event) {
      this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowClick', row, event, column);
    }
  }, {
    key: 'handleCellDbClick',
    value: function handleCellDbClick(row, column, event) {
      this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowDbClick', row, column);
    }
  }, {
    key: 'handleRowContextMenu',
    value: function handleRowContextMenu(row, event) {
      this.dispatchEvent('onRowContextMenu', row, event);
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(name) {
      var fn = this.props[name];

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn && fn.apply(undefined, args);
    }
  }, {
    key: 'isColumnHidden',
    value: function isColumnHidden(index) {
      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          props = _objectWithoutProperties(_props, ['store', 'layout']);

      if (props.fixed === true || props.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (props.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: 'getRowStyle',
    value: function getRowStyle(row, index) {
      var rowStyle = this.props.rowStyle;

      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, row, index);
      }

      return rowStyle;
    }
  }, {
    key: 'getKeyOfRow',
    value: function getKeyOfRow(row, index) {
      var rowKey = this.props.rowKey;

      if (rowKey) {
        return (0, _utils.getRowIdentity)(row, rowKey);
      }

      return index;
    }

    // getRowClass(row, index) {
    //   const { rowClassName, stripe } = this.props;
    //
    // }

  }, {
    key: 'handleExpandClick',
    value: function handleExpandClick(row, rowKey) {
      this.context.store.toggleRowExpanded(row, rowKey);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(row) {
      this.context.store.setCurrentRow(row);
    }
  }, {
    key: 'renderCell',
    value: function renderCell(row, column, index, rowKey) {
      var _this2 = this;

      var type = column.type,
          selectable = column.selectable;

      if (type === 'expand') {
        return React.createElement(
          'div',
          {
            className: this.classNames('ishow-table__expand-icon ', {
              'ishow-table__expand-icon--expanded': this.context.store.isRowExpanding(row, rowKey)
            }),
            onClick: this.handleExpandClick.bind(this, row, rowKey)
          },
          React.createElement('i', { className: 'ishow-icon ishow-icon-arrow-right' })
        );
      }

      if (type === 'index') {
        return React.createElement(
          'div',
          null,
          index + 1
        );
      }

      if (type === 'selection') {
        var isSelected = this.context.store.isRowSelected(row, rowKey);
        return React.createElement(_CheckBox2.default, {
          checked: isSelected,
          disabled: selectable && !selectable(row, index),
          onChange: function onChange() {
            _this2.context.store.toggleRowSelection(row, !isSelected);
          }
        });
      }

      return column.render(row, column, index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          store = _props2.store,
          layout = _props2.layout,
          props = _objectWithoutProperties(_props2, ['store', 'layout']);

      var columnsHidden = store.columns.map(function (column, index) {
        return _this3.isColumnHidden(index);
      });
      return React.createElement(
        'table',
        {
          className: 'ishow-table__body',
          cellPadding: 0,
          cellSpacing: 0,
          style: this.style({
            borderSpacing: 0,
            border: 0
          })
        },
        React.createElement(
          'colgroup',
          null,
          store.columns.map(function (column, index) {
            return React.createElement('col', { style: { width: column.realWidth }, key: index });
          })
        ),
        React.createElement(
          'tbody',
          null,
          store.data.map(function (row, rowIndex) {
            var rowKey = _this3.getKeyOfRow(row, rowIndex);
            return [React.createElement(
              'tr',
              {
                key: rowKey,
                style: _this3.getRowStyle(row, rowIndex),
                className: _this3.className('ishow-table__row', {
                  'ishow-table__row--striped': props.stripe && rowIndex % 2 === 1,
                  'hover-row': store.hoverRow === rowIndex,
                  'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || store.currentRow === row)
                }, typeof props.rowClassName === 'string' ? props.rowClassName : typeof props.rowClassName === 'function' && props.rowClassName(row, rowIndex)),
                onMouseEnter: _this3.handleMouseEnter.bind(_this3, rowIndex),
                onMouseLeave: _this3.handleMouseLeave,
                onClick: _this3.handleClick.bind(_this3, row),
                onContextMenu: _this3.handleRowContextMenu.bind(_this3, row)
              },
              store.columns.map(function (column, cellIndex) {
                return React.createElement(
                  'td',
                  {
                    key: cellIndex,
                    className: _this3.classNames(column.className, column.align, column.columnKey, {
                      'is-hidden': columnsHidden[cellIndex]
                    }),
                    onMouseEnter: _this3.handleCellMouseEnter.bind(_this3, row, column),
                    onMouseLeave: _this3.handleCellMouseLeave.bind(_this3, row, column),
                    onClick: _this3.handleCellClick.bind(_this3, row, column),
                    onDoubleClick: _this3.handleCellDbClick.bind(_this3, row, column)
                  },
                  React.createElement(
                    'div',
                    { className: 'cell' },
                    _this3.renderCell(row, column, rowIndex, rowKey)
                  )
                );
              }),
              !props.fixed && layout.scrollY && !!layout.gutterWidth && React.createElement('td', { className: 'gutter' })
            ), _this3.context.store.isRowExpanding(row, rowKey) && React.createElement(
              'tr',
              { key: rowKey + 'Expanded' },
              React.createElement(
                'td',
                {
                  colSpan: store.columns.length,
                  className: 'ishow-table__expanded-cell'
                },
                typeof props.renderExpanded === 'function' && props.renderExpanded(row, rowIndex)
              )
            )];
          })
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

  return TableBody;
}(_index2.default);

TableBody.contextTypes = {
  store: _propTypes2.default.any,
  layout: _propTypes2.default.any
};
exports.default = TableBody;