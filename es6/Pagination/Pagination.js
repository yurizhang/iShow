var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { default as Component } from '../Common/plugs/index.js';
import Pager from './Pager';
import Select from '../Select/Select';
import Option from '../Select/Option';
import locale from '../Common/locale';
import '../Common/css/Pagination.css';
Select.Option = Option;
var Pre = function Pre(props) {
  var disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return React.createElement(
    'button',
    { type: 'button', className: 'btn-prev ' + disabled, onClick: props.prev },
    React.createElement('i', { className: 'ishow-icon ishow-icon-arrow-left' })
  );
};

var Next = function Next(props) {
  var disabled = props.internalCurrentPage === props.internalPageCount || props.internalPageCount === 0 ? 'disabled' : '';

  return React.createElement(
    'button',
    { type: 'button', className: 'btn-next ' + disabled, onClick: props.next },
    React.createElement('i', { className: 'ishow-icon ishow-icon-arrow-right' })
  );
};

var Sizes = function (_Component) {
  _inherits(Sizes, _Component);

  function Sizes() {
    _classCallCheck(this, Sizes);

    return _possibleConstructorReturn(this, (Sizes.__proto__ || Object.getPrototypeOf(Sizes)).apply(this, arguments));
  }

  _createClass(Sizes, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onSizeChange = _props.onSizeChange,
          internalPageSize = _props.internalPageSize;


      return React.createElement(
        'span',
        { className: 'ishow-pagination__sizes' },
        React.createElement(
          Select,
          {
            size: 'small',
            value: internalPageSize,
            onChange: onSizeChange,
            width: 110
          },
          this.props.pageSizes.map(function (item, idx) {
            return React.createElement(Select.Option, {
              key: idx,
              value: item,
              label: item + ' ' + locale.t('ishow.pagination.pagesize')
            });
          })
        )
      );
    }
  }]);

  return Sizes;
}(Component);

var Total = function Total(props) {
  return typeof props.total === 'number' ? React.createElement(
    'span',
    { className: 'ishow-pagination__total' },
    locale.t('ishow.pagination.total', { total: props.total })
  ) : React.createElement('span', null);
};

var Jumper = function (_Component2) {
  _inherits(Jumper, _Component2);

  function Jumper() {
    _classCallCheck(this, Jumper);

    return _possibleConstructorReturn(this, (Jumper.__proto__ || Object.getPrototypeOf(Jumper)).apply(this, arguments));
  }

  _createClass(Jumper, [{
    key: 'handleChange',
    value: function handleChange(_ref) {
      var target = _ref.target;
      var jumper = this.props.jumper;

      jumper(target.value);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {}
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'span',
        { className: 'ishow-pagination__jump' },
        locale.t('ishow.pagination.goto'),
        React.createElement('input', {
          className: 'ishow-pagination__editor',
          type: 'number',
          min: 1,
          max: this.props.internalPageCount,
          defaultValue: this.props.internalCurrentPage,
          onBlur: this.handleChange.bind(this),
          onKeyUp: function onKeyUp(e) {
            if (e.keyCode === 13) {
              _this3.handleChange(e);
            }
          },
          onFocus: this.handleFocus.bind(this),
          style: { width: '30px' }
        }),
        locale.t('ishow.pagination.pageClassifier')
      );
    }
  }]);

  return Jumper;
}(Component);

// type State = {
//   internalPageSize: number,
//   total: number,
//   pageCount: number,
//   internalCurrentPage: number
// }

var Pagination = function (_Component3) {
  _inherits(Pagination, _Component3);

  //state: State;

  function Pagination(props, context) {
    _classCallCheck(this, Pagination);

    var _this4 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props, context));

    var _this4$props = _this4.props,
        currentPage = _this4$props.currentPage,
        pageSizes = _this4$props.pageSizes,
        pageSize = _this4$props.pageSize,
        total = _this4$props.total,
        pageCount = _this4$props.pageCount,
        layout = _this4$props.layout;

    var internalPageSize = 0;
    if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0];
    } else {
      internalPageSize = pageSize;
    }

    _this4.state = {
      internalPageSize: internalPageSize,
      total: total,
      pageCount: pageCount,
      internalCurrentPage: currentPage ? _this4.getValidCurrentPage(currentPage) : 1
    };
    return _this4;
  }

  _createClass(Pagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this5 = this;

      var _props2 = this.props,
          currentPage = _props2.currentPage,
          pageSizes = _props2.pageSizes,
          pageSize = _props2.pageSize,
          total = _props2.total,
          pageCount = _props2.pageCount;


      if (nextProps.currentPage !== currentPage || nextProps.pageSizes !== pageSizes || nextProps.pageSize !== pageSize || nextProps.total !== total || nextProps.pageCount !== pageCount) {
        var internalPageSize = this.state.internalPageSize;
        if (nextProps.layout.split(',').indexOf('sizes') > -1 && Array.isArray(nextProps.pageSizes)) {
          internalPageSize = nextProps.pageSizes.indexOf(nextProps.pageSize) > -1 ? nextProps.pageSize : nextProps.pageSizes[0];
        }

        this.setState({
          internalPageSize: internalPageSize,
          total: nextProps.total,
          pageCount: nextProps.pageCount
        }, function () {
          _this5.setState({
            internalCurrentPage: nextProps.currentPage ? _this5.getValidCurrentPage(nextProps.currentPage) : 1
          });
        });
      }
    }
  }, {
    key: 'pre',
    value: function pre() {
      var _this6 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage - 1;

      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this6.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this6.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this6.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var _this7 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage + 1;

      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this7.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this7.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this7.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'getValidCurrentPage',
    value: function getValidCurrentPage(value) {
      value = parseInt(value, 10);

      var internalPageCount = this.internalPageCount();

      var resetValue = void 0;
      if (!internalPageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > internalPageCount) {
          resetValue = internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    }
  }, {
    key: 'internalPageCount',
    value: function internalPageCount() {
      if (this.state) {
        if (typeof this.state.total === 'number') {
          return Math.ceil(this.state.total / this.state.internalPageSize);
        } else if (typeof this.state.pageCount === 'number') {
          return this.state.pageCount;
        }
      }

      return null;
    }
  }, {
    key: 'jumperToPage',
    value: function jumperToPage(page) {
      var _this8 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(page)
      }, function () {
        if (oldPage !== _this8.state.internalCurrentPage) {
          var onCurrentChange = _this8.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this8.state.internalCurrentPage);
        }
      });

      //this.oldValue = null;
    }
  }, {
    key: 'handleCurrentChange',
    value: function handleCurrentChange(val) {
      var _this9 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(val)
      }, function () {
        if (oldPage !== _this9.state.internalCurrentPage) {
          var onCurrentChange = _this9.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this9.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: 'onSizeChange',
    value: function onSizeChange(val) {
      var _this10 = this;

      if (val !== this.state.internalPageSize) {
        val = parseInt(val, 10);

        this.setState({
          internalPageSize: val
        }, function () {
          _this10.setState({
            internalCurrentPage: _this10.getValidCurrentPage(_this10.state.internalCurrentPage)
          });
          var onSizeChange = _this10.props.onSizeChange;

          onSizeChange && onSizeChange(val);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          internalCurrentPage = _state.internalCurrentPage,
          internalPageSize = _state.internalPageSize;


      var className = this.classNames({
        'ishow-pagination': true,
        'ishow-pagination__rightwrapper': false,
        'ishow-pagination--small': this.props.small
      });

      var children = [];
      var layout = this.props.layout || '';

      if (!layout) return null;

      var components = layout.split(',').map(function (item) {
        return item.trim();
      });
      var TEMPLATE_MAP = {
        prev: React.createElement(Pre, {
          key: 'pre',
          internalCurrentPage: internalCurrentPage,
          prev: this.pre.bind(this)
        }),
        jumper: React.createElement(Jumper, {
          key: 'jumper',
          jumper: this.jumperToPage.bind(this),
          internalPageCount: this.internalPageCount(),
          internalCurrentPage: internalCurrentPage
        }),
        pager: React.createElement(Pager, {
          key: 'pager',
          currentPage: internalCurrentPage,
          pageCount: this.internalPageCount(),
          onChange: this.handleCurrentChange.bind(this)
        }),
        next: React.createElement(Next, {
          key: 'next',
          internalCurrentPage: internalCurrentPage,
          internalPageCount: this.internalPageCount(),
          next: this.next.bind(this)
        }),
        sizes: React.createElement(Sizes, {
          key: 'sizes',
          internalPageSize: internalPageSize,
          pageSizes: this.props.pageSizes,
          onSizeChange: this.onSizeChange.bind(this)
        }),
        total: React.createElement(Total, { key: 'total', total: this.state.total })
      };

      components.forEach(function (compo) {
        if (compo !== '->') {
          children.push(TEMPLATE_MAP[compo]);
        }
      });

      return React.createElement(
        'div',
        { style: this.style(), className: this.className(className) },
        children
      );
    }
  }]);

  return Pagination;
}(Component);

export default Pagination;


Pagination.propTypes = {
  pageSize: PropTypes.number,
  small: PropTypes.bool,
  total: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,

  //Event
  onCurrentChange: PropTypes.func,
  onSizeChange: PropTypes.func
};

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};