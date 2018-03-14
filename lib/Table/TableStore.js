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

var _locale = require('../Common/locale');

var _locale2 = _interopRequireDefault(_locale);

var _TableLayout = require('./TableLayout');

var _TableLayout2 = _interopRequireDefault(_TableLayout);

var _normalizeColumns = require('./normalizeColumns');

var _normalizeColumns2 = _interopRequireDefault(_normalizeColumns);

var _utils = require('./utils');

require('../Common/css/Table.css');

require('../Common/css/Table-column.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法


var tableIDSeed = 1;

function filterData(data, columns) {
  return columns.reduce(function (preData, column) {
    var filterable = column.filterable,
        filterMultiple = column.filterMultiple,
        filteredValue = column.filteredValue,
        filterMethod = column.filterMethod;

    if (filterable) {
      if (filterMultiple && Array.isArray(filteredValue) && filteredValue.length) {
        return preData.filter(function (_data) {
          return filteredValue.some(function (value) {
            return filterMethod(value, _data);
          });
        });
      } else if (filteredValue) {
        return preData.filter(function (_data) {
          return filterMethod(filteredValue, _data);
        });
      }
    }
    return preData;
  }, data);
}

var TableStore = function (_Component) {
  _inherits(TableStore, _Component);

  _createClass(TableStore, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this
      };
    }
  }]);

  function TableStore(props) {
    _classCallCheck(this, TableStore);

    var _this = _possibleConstructorReturn(this, (TableStore.__proto__ || Object.getPrototypeOf(TableStore)).call(this, props));

    _this.state = {
      fixedColumns: null, // left fixed columns in _columns
      rightFixedColumns: null, // right fixed columns in _columns
      columnRows: null, // columns to render header
      columns: null, // contain only leaf column
      isComplex: null, // whether some column is fixed
      expandingRows: [],
      hoverRow: null,
      rowKey: props.rowKey,
      defaultExpandAll: props.defaultExpandAll,
      currentRow: null,
      selectable: null,
      selectedRows: null,
      sortOrder: null,
      sortColumn: null
    };
    ['toggleRowSelection', 'toggleAllSelection', 'clearSelection', 'setCurrentRow'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });

    _this._isMounted = false;
    return _this;
  }

  _createClass(TableStore, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateColumns((0, _utils.getColumns)(this.props));
      this.updateData(this.props);
      this._isMounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // const { data } = this.props;
      var nextColumns = (0, _utils.getColumns)(nextProps);

      if ((0, _utils.getColumns)(this.props) !== nextColumns) {
        this.updateColumns(nextColumns);
      }

      this.updateData(nextProps);
      // if (data !== nextProps.data) {
      //   this.updateData(nextProps);
      // }
    }
  }, {
    key: 'updateColumns',


    // shouldComponentUpdate(nextProps) {
    //   const propsKeys = Object.keys(this.props);
    //   const nextPropsKeys = Object.keys(nextProps);
    //
    //   if (propsKeys.length !== nextPropsKeys.length) {
    //     return true;
    //   }
    //   for (const key of propsKeys) {
    //     if (this.props[key] !== nextProps[key]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

    value: function updateColumns(columns) {
      var _columns = (0, _normalizeColumns2.default)(columns, tableIDSeed++);

      var fixedColumns = _columns.filter(function (column) {
        return column.fixed === true || column.fixed === 'left';
      });
      var rightFixedColumns = _columns.filter(function (column) {
        return column.fixed === 'right';
      });

      var selectable = void 0;
      if (_columns[0] && _columns[0].type === 'selection') {
        selectable = _columns[0].selectable;
        if (fixedColumns.length && !_columns[0].fixed) {
          _columns[0].fixed = true;
          fixedColumns.unshift(_columns[0]);
        }
      }

      _columns = [].concat(fixedColumns, _columns.filter(function (column) {
        return !column.fixed;
      }), rightFixedColumns);

      this.setState(Object.assign(this.state || {}, {
        fixedColumns: fixedColumns,
        rightFixedColumns: rightFixedColumns,
        columnRows: (0, _utils.convertToRows)(_columns),
        columns: (0, _utils.getLeafColumns)(_columns),
        isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
        selectable: selectable
      }));
    }
  }, {
    key: 'updateData',
    value: function updateData(props) {
      var _props$data = props.data,
          data = _props$data === undefined ? [] : _props$data,
          defaultExpandAll = props.defaultExpandAll,
          defaultSort = props.defaultSort;
      var columns = this.state.columns;

      var filteredData = filterData(data.slice(), columns);

      var _state = this.state,
          hoverRow = _state.hoverRow,
          currentRow = _state.currentRow,
          selectedRows = _state.selectedRows,
          expandingRows = _state.expandingRows;

      hoverRow = hoverRow && data.includes(hoverRow) ? hoverRow : null;
      currentRow = currentRow && data.includes(currentRow) ? currentRow : null;

      if (this._isMounted && data !== this.props.data && !columns[0].reserveSelection) {
        selectedRows = [];
      } else {
        selectedRows = selectedRows && selectedRows.filter(function (row) {
          return data.includes(row);
        }) || [];
      }

      if (!this._isMounted) {
        expandingRows = defaultExpandAll ? data.slice() : [];
      } else {
        expandingRows = expandingRows.filter(function (row) {
          return data.includes(row);
        });
      }

      this.setState(Object.assign(this.state, {
        data: filteredData,
        filteredData: filteredData,
        hoverRow: hoverRow,
        currentRow: currentRow,
        expandingRows: expandingRows,
        selectedRows: selectedRows
      }));

      if ((!this._isMounted || data !== this.props.data) && defaultSort) {
        var prop = defaultSort.prop,
            _defaultSort$order = defaultSort.order,
            order = _defaultSort$order === undefined ? 'ascending' : _defaultSort$order;

        var sortColumn = columns.find(function (column) {
          return column.property === prop;
        });
        this.changeSortCondition(sortColumn, order, false);
      } else {
        this.changeSortCondition(null, null, false);
      }
    }
  }, {
    key: 'setHoverRow',
    value: function setHoverRow(index) {
      if (!this.state.isComplex) return;
      this.setState({
        hoverRow: index
      });
    }
  }, {
    key: 'toggleRowExpanded',
    value: function toggleRowExpanded(row, rowKey) {
      var _this2 = this;

      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;

      if (expandRowKeys) {
        // controlled expanding status
        var isRowExpanding = expandRowKeys.includes(rowKey);
        this.dispatchEvent('onExpand', row, !isRowExpanding);
        return;
      }

      expandingRows = expandingRows.slice();
      var rowIndex = expandingRows.indexOf(row);
      if (rowIndex > -1) {
        expandingRows.splice(rowIndex, 1);
      } else {
        expandingRows.push(row);
      }

      this.setState({
        expandingRows: expandingRows
      }, function () {
        _this2.dispatchEvent('onExpand', row, rowIndex === -1);
      });
    }
  }, {
    key: 'isRowExpanding',
    value: function isRowExpanding(row, rowKey) {
      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;


      if (expandRowKeys) {
        return expandRowKeys.includes(rowKey);
      }
      return expandingRows.includes(row);
    }
  }, {
    key: 'setCurrentRow',
    value: function setCurrentRow() {
      var _this3 = this;

      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var _props = this.props,
          highlightCurrentRow = _props.highlightCurrentRow,
          currentRowKey = _props.currentRowKey;

      if (!highlightCurrentRow || currentRowKey) return;

      var oldRow = this.state.currentRow;

      this.setState({
        currentRow: row
      }, function () {
        _this3.dispatchEvent('onCurrentChange', row, oldRow);
      });
    }
  }, {
    key: 'toggleRowSelection',
    value: function toggleRowSelection(row, isSelected) {
      var _this4 = this;

      var currentRowKey = this.props.currentRowKey;


      if (Array.isArray(currentRowKey)) return;

      var selectedRows = this.state.selectedRows.slice();
      var rowIndex = selectedRows.indexOf(row);

      if (isSelected !== undefined) {
        if (isSelected) {
          rowIndex === -1 && selectedRows.push(row);
        } else {
          rowIndex !== -1 && selectedRows.splice(rowIndex, 1);
        }
      } else {
        rowIndex === -1 ? selectedRows.push(row) : selectedRows.splice(rowIndex, 1);
      }

      this.setState({
        selectedRows: selectedRows
      }, function () {
        _this4.dispatchEvent('onSelect', selectedRows, row);
        _this4.dispatchEvent('onSelectChange', selectedRows);
      });
    }
  }, {
    key: 'toggleAllSelection',
    value: function toggleAllSelection() {
      var _this5 = this;

      var currentRowKey = this.props.currentRowKey;

      if (Array.isArray(currentRowKey)) return;

      var _state2 = this.state,
          data = _state2.data,
          selectedRows = _state2.selectedRows,
          selectable = _state2.selectable;


      if (this.isAllSelected) {
        selectedRows = [];
      } else {
        selectedRows = selectable ? data.filter(function (data, index) {
          return selectable(data, index);
        }) : data.slice();
      }

      this.setState({
        selectedRows: selectedRows
      }, function () {
        _this5.dispatchEvent('onSelectAll', selectedRows);
        _this5.dispatchEvent('onSelectChange', selectedRows);
      });
    }
  }, {
    key: 'clearSelection',
    value: function clearSelection() {
      var currentRowKey = this.props.currentRowKey;

      if (Array.isArray(currentRowKey)) return;

      this.setState({
        selectedRows: []
      });
    }
  }, {
    key: 'isRowSelected',
    value: function isRowSelected(row, rowKey) {
      var currentRowKey = this.props.currentRowKey;
      var selectedRows = this.state.selectedRows;


      if (Array.isArray(currentRowKey)) {
        return currentRowKey.includes(rowKey);
      }
      return selectedRows.includes(row);
    }
  }, {
    key: 'changeSortCondition',
    value: function changeSortCondition(column, order) {
      var _this6 = this;

      var shouldDispatchEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!column) {
        ;

        var _state3 = this.state;
        column = _state3.sortColumn;
        order = _state3.sortOrder;
      }var data = this.state.filteredData.slice();

      if (!column) {
        this.setState({
          data: data
        });
        return;
      }

      var _column = column,
          sortMethod = _column.sortMethod,
          property = _column.property;

      var sortedData = void 0;
      if (!order) {
        sortedData = data;
      } else {
        var flag = order === 'ascending' ? 1 : -1;
        if (sortMethod) {
          sortedData = data.sort(function (a, b) {
            return sortMethod(a, b) ? flag : -flag;
          });
        } else {
          sortedData = data.sort(function (a, b) {
            var aVal = (0, _utils.getValueByPath)(a, property);
            var bVal = (0, _utils.getValueByPath)(b, property);
            return aVal === bVal ? 0 : aVal > bVal ? flag : -flag;
          });
        }
      }

      this.setState({
        sortColumn: column,
        sortOrder: order,
        data: sortedData
      }, function () {
        shouldDispatchEvent && _this6.dispatchEvent('onSortChange', column && order ? { column: column, prop: column.property, order: order } : { column: null, prop: null, order: null });
      });
    }
  }, {
    key: 'toggleFilterOpened',
    value: function toggleFilterOpened(column) {
      column.filterOpened = !column.filterOpened;
      this.forceUpdate();
    }
  }, {
    key: 'changeFilteredValue',
    value: function changeFilteredValue(column, value) {
      var _this7 = this;

      column.filteredValue = value;
      var filteredData = filterData(this.props.data.slice(), this.state.columns);
      this.setState(Object.assign(this.state, {
        filteredData: filteredData
      }), function () {
        _this7.dispatchEvent('onFilterChange', _defineProperty({}, column.columnKey, value));
      });
      this.changeSortCondition(null, null, false);
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
    key: 'render',
    value: function render() {
      var renderExpanded = (this.state.columns.find(function (column) {
        return column.type === 'expand';
      }) || {}).expandPannel;
      return React.createElement(_TableLayout2.default, _extends({}, this.props, {
        renderExpanded: renderExpanded,
        store: this.state
      }));
    }
  }, {
    key: 'isAllSelected',
    get: function get() {
      var currentRowKey = this.props.currentRowKey;
      var _state4 = this.state,
          selectedRows = _state4.selectedRows,
          data = _state4.data,
          selectable = _state4.selectable;

      var selectableData = selectable ? data.filter(function (row, index) {
        return selectable(row, index);
      }) : data;

      if (!selectableData.length) {
        return false;
      }

      if (Array.isArray(currentRowKey)) {
        return currentRowKey.length === selectableData.length;
      }
      return selectedRows.length === selectableData.length;
    }
  }]);

  return TableStore;
}(_index2.default);

TableStore.propTypes = {
  style: _propTypes2.default.object,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.object),
  data: _propTypes2.default.arrayOf(_propTypes2.default.object),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  maxHeight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  stripe: _propTypes2.default.bool,
  border: _propTypes2.default.bool,
  fit: _propTypes2.default.bool,
  showHeader: _propTypes2.default.bool,
  highlightCurrentRow: _propTypes2.default.bool,
  currentRowKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  rowClassName: _propTypes2.default.func,
  rowStyle: _propTypes2.default.func,
  rowKey: _propTypes2.default.func,
  emptyText: _propTypes2.default.string,
  defaultExpandAll: _propTypes2.default.bool,
  expandRowKeys: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])),
  defaultSort: _propTypes2.default.shape({ prop: _propTypes2.default.string, order: _propTypes2.default.oneOf(['ascending', 'descending']) }),
  tooltipEffect: _propTypes2.default.oneOf(['dark', 'light']),
  showSummary: _propTypes2.default.bool,
  sumText: _propTypes2.default.string,
  summaryMethod: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onSelectAll: _propTypes2.default.func,
  onSelectChange: _propTypes2.default.func
};
TableStore.defaultProps = {
  data: [],
  showHeader: true,
  stripe: false,
  fit: true,
  emptyText: _locale2.default.t('ishow.table.emptyText'),
  defaultExpandAll: false,
  highlightCurrentRow: false,
  showSummary: false,
  sumText: _locale2.default.t('ishow.table.sumText')
};
TableStore.childContextTypes = {
  store: _propTypes2.default.any
};
exports.default = TableStore;