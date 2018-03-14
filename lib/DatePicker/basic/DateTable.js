'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../../Common/plugs/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils = require('../utils');

var _index3 = require('../../Common/locale/index');

var _index4 = _interopRequireDefault(_index3);

require('../../Common/css/Date-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //提供style, classname方法

function isFunction(func) {
  return typeof func === 'function';
}

var clearHours = function clearHours(time) {
  var cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

var _WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

var DateTable = function (_Component) {
  _inherits(DateTable, _Component);

  function DateTable(props) {
    _classCallCheck(this, DateTable);

    var _this = _possibleConstructorReturn(this, (DateTable.__proto__ || Object.getPrototypeOf(DateTable)).call(this, props));

    _this.state = {
      tableRows: [[], [], [], [], [], []]
    };
    return _this;
  }

  _createClass(DateTable, [{
    key: 'WEEKS',
    value: function WEEKS() {
      // 0-6
      var week = this.getOffsetWeek();
      return _WEEKS.slice(week).concat(_WEEKS.slice(0, week));
    }
  }, {
    key: 'getOffsetWeek',
    value: function getOffsetWeek() {
      return this.props.firstDayOfWeek % 7;
    }
  }, {
    key: 'getStartDate',
    value: function getStartDate() {
      var ds = (0, _utils.deconstructDate)(this.props.date);
      return (0, _utils.getStartDateOfMonth)(ds.year, ds.month, this.getOffsetWeek());
    }
  }, {
    key: 'getRows',
    value: function getRows() {
      var _props = this.props,
          date = _props.date,
          disabledDate = _props.disabledDate,
          showWeekNumber = _props.showWeekNumber,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          selectionMode = _props.selectionMode,
          firstDayOfWeek = _props.firstDayOfWeek;
      var tableRows = this.state.tableRows;


      var ndate = new Date(date.getTime());
      var day = (0, _utils.getFirstDayOfMonth)(ndate); // day of first day
      var dateCountOfMonth = (0, _utils.getDayCountOfMonth)(ndate.getFullYear(), ndate.getMonth());
      // dates count in december is always 31, so offset year is not neccessary
      var dateCountOfLastMonth = (0, _utils.getDayCountOfMonth)(ndate.getFullYear(), ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1);
      var offsetDaysToWeekOrigin = (0, _utils.getOffsetToWeekOrigin)(day, firstDayOfWeek);

      //tableRows: [ [], [], [], [], [], [] ]
      var rows = tableRows;
      var count = 1;
      var firstDayPosition = void 0;

      var startDate = this.getStartDate();
      var now = clearHours(new Date());

      for (var i = 0; i < 6; i++) {
        // rows
        var row = rows[i];
        /*
        cell: {
          type: string, one of 'week' | 'normal'
          text: String,
          row: number,  row index,
          column: number, column index;
          inRange: boolean,
          start: boolean,
          end: boolean,
          disabled: boolean
        }
        */
        if (showWeekNumber) {
          //prepend week info to the head of each row array
          if (!row[0]) {
            row[0] = { type: 'week', text: (0, _utils.getWeekNumber)(new Date(startDate.getTime() + _utils.DAY_DURATION * (i * 7 + 1))) };
          }
        }

        for (var j = 0; j < 7; j++) {
          // columns
          var cell = row[showWeekNumber ? j + 1 : j];
          if (!cell) {
            row[showWeekNumber ? j + 1 : j] = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
            cell = row[showWeekNumber ? j + 1 : j];
          }

          cell.type = 'normal';

          var index = i * 7 + j; //current date offset
          var time = startDate.getTime() + _utils.DAY_DURATION * index;
          cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
          cell.start = minDate && time === clearHours(minDate);
          cell.end = maxDate && time === clearHours(maxDate);
          var isToday = time === now;

          if (isToday) {
            cell.type = 'today';
          }

          if (i === 0) {
            //handle first row of date, this row only contains all or some pre-month dates
            if (j >= offsetDaysToWeekOrigin) {
              cell.text = count++;
              if (count === 2) {
                firstDayPosition = i * 7 + j;
              }
            } else {
              cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1;
              cell.type = 'prev-month';
            }
          } else {
            if (count <= dateCountOfMonth) {
              //in current dates
              cell.text = count++;
              if (count === 2) {
                firstDayPosition = i * 7 + j;
              }
            } else {
              // next month
              cell.text = count++ - dateCountOfMonth;
              cell.type = 'next-month';
            }
          }

          cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), _utils.SELECTION_MODES.DAY);
        }

        if (selectionMode === _utils.SELECTION_MODES.WEEK) {
          var start = showWeekNumber ? 1 : 0;
          var end = showWeekNumber ? 7 : 6;
          var isWeekActive = this.isWeekActive(row[start + 1]);

          row[start].inRange = isWeekActive;
          row[start].start = isWeekActive;
          row[end].inRange = isWeekActive;
          row[end].end = isWeekActive;
          row.isWeekActive = isWeekActive;
        }
      }

      rows.firstDayPosition = firstDayPosition;

      return rows;
    }

    // calc classnames for cell

  }, {
    key: 'getCellClasses',
    value: function getCellClasses(cell) {
      var _props2 = this.props,
          selectionMode = _props2.selectionMode,
          date = _props2.date;


      var classes = [];
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available');
        if (cell.type === 'today') {
          classes.push('today');
        }
      } else {
        classes.push(cell.type);
      }

      if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today')
      // following code only highlight date that is the actuall value of the datepicker, but actually it should
      // be the temp that value use selected
      && date.getDate() === +cell.text) {
        // && value
        // && value.getFullYear() === date.getFullYear()
        // && value.getMonth() === date.getMonth()
        // && value.getDate() === Number(cell.text)) {
        classes.push('current');
      }

      if (cell.inRange && (cell.type === 'normal' || cell.type === 'today' || selectionMode === 'week')) {
        classes.push('in-range');

        if (cell.start) {
          classes.push('start-date');
        }

        if (cell.end) {
          classes.push('end-date');
        }
      }

      if (cell.disabled) {
        classes.push('disabled');
      }

      return classes.join(' ');
    }
  }, {
    key: 'getMarkedRangeRows',
    value: function getMarkedRangeRows() {
      var _props3 = this.props,
          showWeekNumber = _props3.showWeekNumber,
          minDate = _props3.minDate,
          selectionMode = _props3.selectionMode,
          rangeState = _props3.rangeState;

      var rows = this.getRows();
      if (!(selectionMode === _utils.SELECTION_MODES.RANGE && rangeState.selecting && rangeState.endDate instanceof Date)) return rows;

      var maxDate = rangeState.endDate;
      for (var i = 0, k = rows.length; i < k; i++) {
        var row = rows[i];
        for (var j = 0, l = row.length; j < l; j++) {
          if (showWeekNumber && j === 0) continue;

          var cell = row[j];
          var index = i * 7 + j + (showWeekNumber ? -1 : 0);
          var time = this.getStartDate().getTime() + _utils.DAY_DURATION * index;

          cell.inRange = minDate && time >= clearHours(minDate) && time <= clearHours(maxDate);
          cell.start = minDate && time === clearHours(minDate.getTime());
          cell.end = maxDate && time === clearHours(maxDate.getTime());
        }
      }

      return rows;
    }
  }, {
    key: 'isWeekActive',
    value: function isWeekActive(cell) {
      if (this.props.selectionMode !== _utils.SELECTION_MODES.WEEK) return false;
      if (!this.props.value) return false;

      var newDate = new Date(this.props.date.getTime()); // date view
      var year = newDate.getFullYear();
      var month = newDate.getMonth();

      if (cell.type === 'prev-month') {
        newDate.setMonth(month === 0 ? 11 : month - 1);
        newDate.setFullYear(month === 0 ? year - 1 : year);
      }

      if (cell.type === 'next-month') {
        newDate.setMonth(month === 11 ? 0 : month + 1);
        newDate.setFullYear(month === 11 ? year + 1 : year);
      }
      newDate.setDate(parseInt(cell.text, 10));

      return (0, _utils.getWeekNumber)(newDate) === (0, _utils.deconstructDate)(this.props.value).week; // current date value
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {
      var _this2 = this;

      var _props4 = this.props,
          showWeekNumber = _props4.showWeekNumber,
          onChangeRange = _props4.onChangeRange,
          rangeState = _props4.rangeState,
          selectionMode = _props4.selectionMode;


      var getDateOfCell = function getDateOfCell(row, column, showWeekNumber) {
        var startDate = _this2.getStartDate();
        return new Date(startDate.getTime() + (row * 7 + (column - (showWeekNumber ? 1 : 0))) * _utils.DAY_DURATION);
      };

      if (!(selectionMode === _utils.SELECTION_MODES.RANGE && rangeState.selecting)) return;

      var target = event.target;
      if (target.tagName !== 'TD') return;

      var column = target.cellIndex;
      var row = target.parentNode.rowIndex - 1;

      rangeState.endDate = getDateOfCell(row, column, showWeekNumber);
      onChangeRange(rangeState);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var target = event.target;

      if (target.tagName !== 'TD') return;
      if ((0, _utils.hasClass)(target, 'disabled') || (0, _utils.hasClass)(target, 'week')) return;

      var _props5 = this.props,
          selectionMode = _props5.selectionMode,
          date = _props5.date,
          onPick = _props5.onPick,
          minDate = _props5.minDate,
          maxDate = _props5.maxDate,
          rangeState = _props5.rangeState;

      var _deconstructDate = (0, _utils.deconstructDate)(date),
          year = _deconstructDate.year,
          month = _deconstructDate.month;

      if (selectionMode === 'week') {
        target = target.parentNode.cells[1];
      }

      var cellIndex = target.cellIndex;
      var rowIndex = target.parentNode.rowIndex - 1;

      var cell = this.getRows()[rowIndex][cellIndex];
      var text = cell.text;
      var className = target.className;

      var newDate = new Date(year, month, 1);

      if (className.indexOf('prev') !== -1) {
        if (month === 0) {
          newDate.setFullYear(year - 1);
          newDate.setMonth(11);
        } else {
          newDate.setMonth(month - 1);
        }
      } else if (className.indexOf('next') !== -1) {
        if (month === 11) {
          newDate.setFullYear(year + 1);
          newDate.setMonth(0);
        } else {
          newDate.setMonth(month + 1);
        }
      }

      newDate.setDate(parseInt(text, 10));
      if (selectionMode === _utils.SELECTION_MODES.RANGE) {
        if (rangeState.selecting) {
          if (newDate < minDate) {
            rangeState.selecting = true;
            onPick({ minDate: (0, _utils.toDate)(newDate), maxDate: null }, false);
          } else if (newDate >= minDate) {
            rangeState.selecting = false;
            onPick({ minDate: minDate, maxDate: (0, _utils.toDate)(newDate) }, true);
          }
        } else {
          if (minDate && maxDate || !minDate) {
            // be careful about the rangeState & onPick order
            // since rangeState is a object, mutate it will make child DateTable see the
            // changes, but wont trigger a DateTable re-render. but onPick would trigger it.
            // so a reversed order may cause a bug.
            rangeState.selecting = true;
            onPick({ minDate: (0, _utils.toDate)(newDate), maxDate: null }, false);
          }
        }
      } else if (selectionMode === _utils.SELECTION_MODES.DAY || selectionMode === _utils.SELECTION_MODES.WEEK) {
        onPick({ date: newDate });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var $t = _index4.default.t;
      var _props6 = this.props,
          selectionMode = _props6.selectionMode,
          showWeekNumber = _props6.showWeekNumber;


      return _react2.default.createElement(
        'table',
        {
          cellSpacing: '0',
          cellPadding: '0',
          onClick: this.handleClick.bind(this),
          onMouseMove: this.handleMouseMove.bind(this),
          className: this.classNames('ishow-date-table', { 'is-week-mode': selectionMode === 'week' }) },
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            showWeekNumber && _react2.default.createElement(
              'th',
              null,
              $t('el.datepicker.week')
            ),
            this.WEEKS().map(function (e, idx) {
              return _react2.default.createElement(
                'th',
                { key: idx },
                $t('el.datepicker.weeks.' + e)
              );
            })
          ),
          this.getMarkedRangeRows().map(function (row, idx) {
            return _react2.default.createElement(
              'tr',
              {
                key: idx,
                className: _this3.classNames('ishow-date-table__row', { 'current': row.isWeekActive }) },
              row.map(function (cell, idx) {
                return _react2.default.createElement(
                  'td',
                  { className: _this3.getCellClasses(cell), key: idx },
                  cell.type === 'today' ? '今天' : cell.text
                );
              })
            );
          })
        )
      );
    }
  }]);

  return DateTable;
}(_index2.default);

exports.default = DateTable;


DateTable.propTypes = {
  disabledDate: _propTypes2.default.func,
  showWeekNumber: _propTypes2.default.bool,
  //minDate, maxDate: only valid in range mode. control date's start, end info
  minDate: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.instanceOf(Date),
  selectionMode: _propTypes2.default.oneOf(Object.keys(_utils.SELECTION_MODES).map(function (e) {
    return _utils.SELECTION_MODES[e];
  })),
  // date view model, all visual view derive from this info
  date: _propTypes2.default.instanceOf(Date).isRequired,
  // current date value, use picked.
  value: _propTypes2.default.instanceOf(Date),
  /*
  (data, closePannel: boolean)=>()
     data:
      if selectionMode = range: // notify when ranges is change
        minDate: Date|null,
        maxDate: Date|null
       if selectionMode = date
        date: Date
       if selectionMode = week:
        year: number
        week: number,
        value: string,
        date: Date
  */
  onPick: _propTypes2.default.func.isRequired,

  /*
  ({
    endDate: Date,
    selecting: boolean,
  })=>()
  */
  onChangeRange: _propTypes2.default.func,
  rangeState: _propTypes2.default.shape({
    endDate: _propTypes2.default.date,
    selecting: _propTypes2.default.bool
  }),
  firstDayOfWeek: _propTypes2.default.range(0, 6)
};

DateTable.defaultProps = {
  selectionMode: 'day',
  firstDayOfWeek: 0
};